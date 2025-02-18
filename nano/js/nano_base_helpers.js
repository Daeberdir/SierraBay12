NanoBaseHelpers = function () {
  var _baseHelpers = {
    syndicateMode: function () {
      $('body').css("background-color","#8f1414")
      $('body').css("background-image","url('uiBackground-Syndicate.png')")
      $('body').css("background-position","50% 0")
      $('body').css("background-repeat","repeat-x")
      $('#uiTitleFluff').css("background-image","url('uiTitleFluff-Syndicate.png')")
      $('#uiTitleFluff').css("background-position","50% 50%")
      $('#uiTitleFluff').css("background-repeat", "no-repeat")
      return ''
    },
    ntscieMode: function () {
      $('body').css("background-color","#502a42")
      $('body').css("background-image","url('uiBackground-NTsci.png')")
      $('body').css("background-position","50% 0")
      $('body').css("background-repeat","repeat-x")
      $('#uiTitleFluff').css("background-image","url('uiTitleFluff.png')")
      $('#uiTitleFluff').css("background-position","50% 50%")
      $('#uiTitleFluff').css("background-repeat", "no-repeat")
      return ''
    },
    link: function (text, icon, parameters, status, elementClass, elementId) {
      var iconHtml = ''
      var iconClass = 'noIcon'
      if (typeof icon !== 'undefined' && icon) {
        iconHtml = '<div class="uiLinkPendingIcon"></div><div class="uiIcon16 icon-' + icon + '"></div>'
        iconClass = 'hasIcon'
      }
      if (typeof elementClass === 'undefined' || !elementClass)
        elementClass = 'link'
      var elementIdHtml = ''
      if (typeof elementId !== 'undefined' && elementId) {
        elementIdHtml = 'id="' + elementId + '"'
      }
      if (typeof status !== 'undefined' && status)
        return '<div unselectable="on" class="link ' + iconClass + ' ' + elementClass + ' ' + status + '" ' + elementIdHtml + '>' + iconHtml + text + '</div>'
      return '<div unselectable="on" class="linkActive ' + iconClass + ' ' + elementClass + '" data-href="' + NanoUtility.generateHref(parameters) + '" ' + elementIdHtml + '>' + iconHtml + text + '</div>'
    },

    round: function (number) {
      return Math.round(number)
    },

    fixed: function (number) {
      return Math.round(number * 10) / 10
    },

    floor: function (number) {
      return Math.floor(number)
    },

    ceil: function (number) {
      return Math.ceil(number)
    },

    // Format a string (~string("Hello {0}, how are {1}?", 'Martin', 'you') becomes "Hello Martin, how are you?")
    string: function () {
      if (arguments.length === 0)
        return ''
      else if (arguments.length === 1)
        return arguments[0]
      var stringArgs = []
      for (var i = 1; i < arguments.length; i++)
        stringArgs.push(arguments[i])
      return arguments[0].format(stringArgs)
    },

    formatNumber: function(x) {
      var parts = x.toString().split(".")
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      return parts.join(".")
    },

    capitalizeFirstLetter: function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },

    displayBar: function (value, rangeMin, rangeMax, styleClass, showText, difClass, direction) {
      if (rangeMin < rangeMax) {
        if (value < rangeMin)
          value = rangeMin
        else if (value > rangeMax)
          value = rangeMax
      }
      else if (value > rangeMin)
        value = rangeMin
      else if (value < rangeMax)
        value = rangeMax
      if (typeof styleClass === 'undefined' || !styleClass)
        styleClass = ''
      if (typeof showText === 'undefined' || !showText)
        showText = ''
      if (typeof difClass === 'undefined' || !difClass)
        difClass = ''
      if (typeof direction === 'undefined' || !direction)
        direction = 'width'
      else
        direction = 'height'
      var percentage = Math.round((value - rangeMin) / (rangeMax - rangeMin) * 100)
      return '<div class="displayBar' + difClass + ' ' + styleClass + '"><div class="displayBar' + difClass + 'Fill ' + styleClass + '" style="' + direction + ': ' + percentage + '%;"></div><div class="displayBar' + difClass + 'Text ' + styleClass + '">' + showText + '</div></div>'
    },

    displayDNABlocks: function (dnaString, selectedBlock, selectedSubblock, blockSize, paramKey) {
      if (!dnaString)
        return '<div class="notice">Please place a valid subject into the DNA modifier.</div>'
      var characters = dnaString.split('')
      var html = '<div class="dnaBlock"><div class="link dnaBlockNumber">1</div>'
      var block = 1
      var subblock = 1

      for (index in characters) {
        if (!characters.hasOwnProperty(index) || typeof characters[index] === 'object')
          continue
        var parameters
        if (paramKey.toUpperCase() === 'UI')
          parameters = { 'selectUIBlock' : block, 'selectUISubblock' : subblock }
        else
          parameters = { 'selectSEBlock' : block, 'selectSESubblock' : subblock }

        var status = 'linkActive'
        if (block === selectedBlock && subblock === selectedSubblock)
          status = 'selected'

        html += '<div class="link ' + status + ' dnaSubBlock" data-href="' + NanoUtility.generateHref(parameters) + '" id="dnaBlock' + index + '">' + characters[index] + '</div>'

        index++
        if (index % blockSize === 0 && index < characters.length) {
          block++
          subblock = 1
          html += '</div><div class="dnaBlock"><div class="link dnaBlockNumber">' + block + '</div>'
        }
        else
          subblock++
      }
      html += '</div>'
      return html
    }
  }

  return {
    addHelpers: function () {
      NanoTemplate.addHelpers(_baseHelpers)
    },

    removeHelpers: function () {
      for (var helperKey in _baseHelpers)
        if (_baseHelpers.hasOwnProperty(helperKey))
          NanoTemplate.removeHelper(helperKey)
    }
  }
}()
