var DateFormats = {
       short: "DD.MMMM.YYYY",
       long: "dddd DD.MM.YYYY HH:mm"
};

UI.registerHelper("formatDate", function(datetime, format) {
  if (moment) {
    // can use other formats like 'lll' too
    format = DateFormats[format] || format;
    return moment(datetime).format(format);
  }
  else {
    return datetime;
  }
});