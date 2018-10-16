export default {
  filters: {
    capitalize: function (string) {
      if (!string) {
        return null
      }
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
    },
    upperCase: function (string) {
      if (!string) {
        return null
      }
      return string.toUpperCase()
    },
    ifExist: function (string) {
      if (string) {
        return string
      }
      return 'Non renseigné'
    },
    removeExtraChars: function (string) {
      if (!string) {
        return null
      }
      const withoutAsterisk = string.replace(/\*/g, ' ')
      const withoutAsteriskOrSlash = withoutAsterisk.replace(/\//g, ' ')
      // Remove potential double spaces and potential space at end of string
      return withoutAsteriskOrSlash.replace(/ {2}/g, ' ').replace(/ $/, '')
    },
    truncate: function (string) {
      if (string && string.length > 80) {
        return `${string.substring(0, 75)}...`
      }
      return string
    },
    pluralizeDependingOn: function (string, int) {
      if (int > 1) {
        return `${string}s`
      } else {
        return string
      }
    }
  },
  methods: {
    frenchNumberFormat: function(input) {
      return new Intl.NumberFormat('fr-FR').format(input)
    },
    concatIfExist(base, addition) {
      if (addition) {
        return base.concat(' ', addition)
      }
      return base
    }
  }
}
