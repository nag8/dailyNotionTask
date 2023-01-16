const SHEET = {
  config: {
    name: 'config',
    range: {
      notionToken: 'B1',
      notionDBId: 'B2',
    },
  },
  page: {
    name: 'page',
    row: {
      data: 2,
    },
    column: {
      type: 1,
      propertyName: 2,
      value: 3,
    },
  },
};


function getSheetData(sheetConfig){
  let data = getSheetDataFull(sheetConfig);
  [...Array(sheetConfig.row.data - 1)].forEach(_ => data.shift());
  return data;
}

function getSheetDataFull(sheetConfig){
  const sheet = SpreadsheetApp.getActive().getSheetByName(sheetConfig.name);
  return sheet.getDataRange().getValues();
}