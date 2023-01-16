class Order{
  constructor(){
    this.notionRecord = Notion.initRecord();

    getSheetData(SHEET.page).forEach(row => {

      const propertyName = row[SHEET.page.column.propertyName - 1];
      const value = row[SHEET.page.column.value - 1];

      switch(row[SHEET.page.column.type - 1]){
        case 'アイコン':
          this.notionRecord.setIcon(value);
          break;
        case 'タイトル':
          this.notionRecord.setTitle(propertyName, value);
          break;
        case '日付':
          this.notionRecord.setPropertiesDate(propertyName, dayjs.dayjs(value));
          break;
        case '日時':
          this.notionRecord.setPropertiesDatetime(propertyName, dayjs.dayjs(value));
          break;
        case 'セレクト':
          this.notionRecord.setPropertiesSelect(propertyName, value);
          break;
        case 'URL':
          this.notionRecord.setPropertiesUrl(propertyName, value);
          break;
        case '数値':
          this.notionRecord.setPropertiesNumber(propertyName, value);
          break;
        case 'テキスト':
          this.notionRecord.pushChildrenText(value);
          break;
        case 'イメージ':
          this.notionRecord.pushChildrenImage(value);
          break;
        default:
          break; 
      }
    });
  }

  createRecordNotion(){
    const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET.config.name);
    const token = sheet.getRange(SHEET.config.range.notionToken).getValue();
    const dbId = sheet.getRange(SHEET.config.range.notionDBId).getValue();
    Notion.initManager(token).createRecord(dbId, this.notionRecord);
  }
}