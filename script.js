function convertNumberedListToPlainText() {
  var body = DocumentApp.getActiveDocument().getBody();
  var numChildren = body.getNumChildren();
  var listCounters = {};
  var lid = NaN;

  for (var i = 0; i < numChildren; i++) {
    var element = body.getChild(i);
    

    if (element.getType() == DocumentApp.ElementType.LIST_ITEM) {
      var listItem = element.asListItem();
      var nestingLevel = listItem.getNestingLevel();
      var listId = listItem.getListId()
      if (!lid) {lid=listId}

      // Initialize the counter for the current nesting level if it doesn't exist
      if (!listCounters[nestingLevel]) {
        listCounters[nestingLevel] = 1;
      }

      if (lid == listId)
      // Build the prefix
      {
      var prefix = '';
      for (var j = 0; j <= nestingLevel; j++) {
        if (!listCounters[j]) {
          listCounters[j] = 1;
        }
        if (j != (nestingLevel)) {prefix += listCounters[j]-1 + '.';}
        else{
        prefix += listCounters[j] + '.';}

      }

      prefix = '[' + prefix.slice(0, -1) + ']  ';
      var text = listItem.getText();
      listItem.setText(prefix + text);
      var textElement = listItem.editAsText();
      
      // Set the bold formatting for the prefix
      textElement.setBold(0, prefix.length - 1, true); // Set bold for the prefix part

      // listItem.setGlyphType(DocumentApp.GlyphType.NONE); // Remove list markers

      // Increment the counter for the current level
      listCounters[nestingLevel]++;
      
      // Reset counters for deeper levels
      for (var j = nestingLevel + 1; j < Object.keys(listCounters).length; j++) {
        listCounters[j] = 1;
      }
      }
    }
  }
}
