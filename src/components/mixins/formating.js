import Greffes from '@/assets/fixtures/codesGreffes.json'
import Filters from '@/components/mixins/filters.js'

function frenchNumberFormat(input) {
  return new Intl.NumberFormat('fr-FR').format(input)
}

function nameFromCodeGreffe(code) {
  return Greffes.listeGreffes[code]
}

function concatIfExist(base, thisExist, additionIfYes, additionIfNo) {
  if (thisExist) {
    return base.concat('', additionIfYes)
  } else {
    return base.concat('', additionIfNo)
  }
}

function FixeOrVariable(letter) {
  if (letter == 'F') {
    return 'capital fixe'
  } else if (letter == 'V') {
    return 'capital variable'
  }
  return letter
}

function PrincipaleOrSecondaire(letter) {
  if (letter == 'P') {
    return 'Principale'
  } else if (letter == 'S') {
    return 'Secondaire'
  }
  return letter
}

function RNCSDeviseSentence (infos) {
  let sentence = `Valeur : ${Filters.filters.ifExist(frenchNumberFormat(infos.capital))}`

  sentence = concatIfExist(sentence, infos.devise, ` ${infos.devise}`,', de devise non précisée')
  sentence = concatIfExist(sentence, infos.type_capital, ` (type: ${FixeOrVariable(infos.type_capital)})`,'')
  sentence = concatIfExist(sentence, infos.capital_actuel, `. Le capital actuel est de ${infos.capital_actuel}`,'')

  return sentence
}

function RNCSLastModification (infos) {
  let sentence = concatIfExist('', infos.libelle_derniere_modification, infos.libelle_derniere_modification, '')
  sentence = concatIfExist(sentence, (infos.libelle_derniere_modification && infos.date_derniere_modification),', ', '')
  sentence = concatIfExist(sentence, infos.date_derniere_modification, `le ${infos.date_derniere_modification}.`, '')

  return sentence
}

function RNCSConcatGreffe (infos) {
  let sentence = infos.nom_greffe
  sentence = concatIfExist(sentence, infos.code_greffe, ` (Code : ${infos.code_greffe})`, '')

  return sentence
}

function RNCSConcatName (person) {

  let name = Filters.filters.upperCase(person.nom_patronyme)

  return concatIfExist(name, person.prenoms, `, ${person.prenoms}`, '')
}

function RNCSConcatAddress(infos) {
  let address = concatIfExist('', infos.adresse_code_postal, infos.adresse_code_postal, '')
  address = concatIfExist(address, (infos.adresse_code_postal && infos.adresse_ville), ', ', '')
  address = concatIfExist(address, infos.adresse_ville, `${Filters.filters.capitalize(infos.adresse_ville)} `, ' ')
  address = concatIfExist(address, infos.adresse_pays, Filters.filters.upperCase(infos.adresse_pays), '')

  return address
}

export default {
  methods: {
    frenchNumberFormat,
    nameFromCodeGreffe,
    concatIfExist,
    PrincipaleOrSecondaire,
    RNCSDeviseSentence,
    RNCSLastModification,
    RNCSConcatGreffe,
    RNCSConcatName,
    RNCSConcatAddress
  }
}
