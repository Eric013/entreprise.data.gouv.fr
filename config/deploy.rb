require 'mina/bundler'
require 'mina/rails'
require 'colorize'

ENV['domain'] || raise('no domain provided'.red)

ENV['to'] ||= 'sandbox'
unless %w[sandbox production rncs].include?(ENV['to'])
  raise("target environment (#{ENV['to']}) not in the list")
end

set :user, 'deploy'
set :application_name, 'entreprise.data.gouv.fr'

set :deploy_to, "/var/www/entreprise.data.gouv.fr_#{ENV['to']}"

# repository is useless, because we don't clone. But required for mina/rails in charge of repository setup.
set :repository, 'git@github.com:etalab/entreprise.data.gouv.fr.git'

set :forward_agent, true
set :port, 22

if ENV['to'] == 'production'
  set :branch, 'master'
elsif ENV['to'] == 'sandbox'
  set :branch, 'develop'
elsif ENV['to'] == 'rncs'
  set :branch, 'develop'
end

desc 'Deploys the current version to the server.'
task :deploy do
  run :local do
    in_path(Dir.pwd) do
      invoke :ensure_right_branch
      invoke :local_build
      invoke :deploy_website
    end
  end
end

task :local_build do
  comment 'Building...'.green
  if ENV['to'] == 'production'
    command 'npm run build:production'
  elsif ENV['to'] == 'rncs'
    command 'npm run build:rncs'
  else
    command 'npm run build:sandbox'
  end
end

task :deploy_website do
  comment 'Copying files to remote directory...'.green
  command "scp -r dist/* #{fetch(:user)}@#{fetch(:domain)}:#{fetch(:deploy_to)}"
end

task :ensure_right_branch do
  git_active_branch = 'git rev-parse --abbrev-ref HEAD'
  comment "Ensuring you're on the branch you're deploying to".yellow
  command "if (#{git_active_branch} | grep #{fetch(:branch)}) > /dev/null
    then
      echo 'You are on the right branch, continuing...'
    else
      echo 'YOU ARE NOT ON THE RIGHT BRANCH, EXITING !'
      exit
    fi"
end
