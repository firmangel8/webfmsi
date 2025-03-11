import { degreeLabelFull } from "./constant";

export const formatDateIndonesia = (inputDate) => {
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timeZoneName: "short",
  };

  const date = inputDate ? new Date(inputDate) : new Date();
  const formattedDate = new Intl.DateTimeFormat("id-ID", options).format(date);

  // Manually replace English day and month names with Bahasa Indonesia names
  const bahasaDays = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  const bahasaMonths = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const formattedBahasaDate = formattedDate
    .replace(new RegExp(options.weekday, "g"), bahasaDays[date.getDay()])
    .replace(new RegExp(options.month, "g"), bahasaMonths[date.getMonth()]);

  return formattedBahasaDate;
};

export const filterSelectOption = (selectionList, idSelect) => {
  return selectionList.filter((item) => item.value == idSelect);
};

export const convertEnumSelect = (data, id, label) => {
  let datas = data.map((obj) => ({
    id: obj[id],
    value: obj[id],
    label: obj[label],
  }));
  return datas;
};

export const getDegree = (degree) => {
  let degreeSelected = degreeLabelFull.filter((item) => item.value == degree);
  return degreeSelected[0].label;
};

export const moveElement = (array, fromIndex, toIndex) => {
  const element = array.splice(fromIndex, 1)[0];
  array.splice(toIndex, 0, element);
  return array;
};

export const reorderTag = (list, startIndex, endIndex) => {
  console.log("reorder tag call");
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const getItemStyleTag = ({ isDragging }, { draggableProps }) => ({
  userSelect: "none",
  display: "inline-block",
  overflow: "none",
  background: isDragging ? "lightgreen" : "transparent",
  borderRadius: isDragging && "4px",
  ...draggableProps.style,
});

export const combinePage = (pageFrom, pageTo) => {
  let page = pageFrom || "";
  if (pageTo) {
    page = `${pageFrom} - ${pageTo}`;
  }
  return page;
};

export const standardDoi = (doi) => {
  let doiDomain = "https://doi.org/";
  if (!doi.startsWith(doiDomain)) {
    return doiDomain + doi;
  }
  return doi;
};

export const authorTrimmed = (authors_list) => {
  let trimmedAuthor = authors_list.map((item) => item.trim());
  let authorsStr = trimmedAuthor.join(", ");
  return authorsStr;
};

export const ieeeCitationFormatter = (
  authors_list,
  title,
  journal_name,
  city,
  volume,
  issue,
  pageFrom,
  pageTo,
  months,
  years,
  publihser,
  doiStr,
) => {
  // Handle null or empty values
  let lists = [];
  const pages = pageFrom ? combinePage(pageFrom, pageTo) : "";
  const trimmedAuthor = authors_list.map((item) => item.trim());
  let authors = trimmedAuthor.join(", ");
  lists.push(authors);
  lists.push(title);
  lists.push(journal_name);
  lists.push(city);
  lists.push(volume);
  lists.push(issue);
  lists.push(pages);
  lists.push(months);
  lists.push(years);
  lists.push(publihser);
  lists.push(doiStr);
  const filteredList = lists.filter((item) => item !== null && item !== "");
  let citation = filteredList.join(". ");
  return citation;
};

export const ieeeCitationFormatBooks = (
  authorsList,
  title,
  edition,
  city,
  publisher,
  years,
) => {
  // Authors. Last Name, *Title of the Book*, xth ed. City of Publisher. Publisher, Year.
  // eg: K T Dermawan, "Test Books", For Advanced Edition. Singaraja. Ganesha Press. Year

  let lists = [];
  let titleWithEdition = title;
  let publisherWithYear = publisher;
  const trimmedAuthor = authorsList.map((item) => item.trim());
  let authors = trimmedAuthor.join(", ");

  lists.push(authors);
  if (edition) {
    titleWithEdition = `"${title}", ${edition}`;
  }
  lists.push(titleWithEdition);
  lists.push(city);
  if (years) {
    publisherWithYear = `${publisher}, ${years}`;
  }
  lists.push(publisherWithYear);

  let filteredList = lists.filter((item) => item !== null && item !== "");
  let citation = filteredList.join(". ");
  return citation;
};

export const ieeeCitationFormatBookSection = (
  authorsList,
  bookSection,
  title,
  bookEdition,
  publisher,
  years,
  volumeChapter,
  pageFrom,
  pageTo,
) => {
  // [#] Author(s) Initial(s). Last Name, "Title of the chapter," in *Title of the Book*, xth ed., Editor(s) Initial(s). Last Name, Ed(s). City of Publisher, (only U.S. State), Country: Publisher, Year, ch. x, sec. x, pp. xxx-xxx.
  // K T Dermawan, "Introduction to data science," in Data Science Fundamentals, 2nd edition. Ganesha Exact, 2021, ch. 1, pp. 1-20.
  let lists = [];
  const trimmedAuthor = authorsList.map((item) => item.trim());
  let authors = trimmedAuthor.join(", ");
  let bookSectionWithTitle = title;

  let metaPublished = years;
  let pagesStr = pageFrom;

  if (bookSection) {
    bookSectionWithTitle = `"${bookSection}" in ${title}`;
  }
  if (bookEdition) {
    bookSectionWithTitle = `${bookSectionWithTitle}, ${bookEdition}`;
  }

  if (publisher) {
    metaPublished = `${publisher}, ${years}`;
  }
  if (volumeChapter) {
    metaPublished = `${metaPublished}, ch. ${volumeChapter}`;
  }
  if (pageTo) {
    pagesStr = `pp. ${pageFrom}-${pageTo}`;
    metaPublished = `${metaPublished}, ${pagesStr}`;
  }

  lists.push(authors);
  lists.push(bookSectionWithTitle);
  lists.push(metaPublished);

  let filteredList = lists.filter((item) => item !== null && item !== "");
  let citation = filteredList.join(". ");
  return citation;
};

export const ieeeCitationFormatProceedings = (
  authorsList,
  title,
  proceedingTitle,
  city,
  years,
  pageFrom,
  pageTo,
  doiStr,
) => {
  // Author(s) Initial(s). Last Name, "Title of the paper," in *Proceedings of the [Conference Name]*, City of Conference, Year, pp. xxx-xxx.
  // eg. K T Dermawan. "Title of Paper" in "IConvet 1", Singaraja, 2024, pp. 10-15
  let lists = [];
  const trimmedAuthor = authorsList.map((item) => item.trim());
  let authors = trimmedAuthor.join(", ");
  let journalCompiled = title;
  let pagesStr = pageFrom;

  if (proceedingTitle) {
    journalCompiled = `"${title}" in "${proceedingTitle}"`;
  }
  if (city) {
    journalCompiled = `${journalCompiled}, ${city}`;
  }
  if (years) {
    journalCompiled = `${journalCompiled}, ${years}`;
  }
  if (pageTo) {
    pagesStr = `pp. ${pageFrom}-${pageTo}`;
    journalCompiled = `${journalCompiled}, ${pagesStr}`;
  }
  lists.push(authors);
  lists.push(journalCompiled);
  lists.push(doiStr);

  let filteredList = lists.filter((item) => item !== null && item !== "");
  let citation = filteredList.join(". ");
  return citation;
};

export const compilationCrossrefProceedings = (msg) => {
  let typeResp = msg?.type || "";
  let title = msg?.title[0] || "";
  let publisher = msg?.publisher || "";

  let authorResp = msg?.author || [];
  let authorList = authorResp.map((item) => `${item?.given}  ${item?.family}`);
  let proceedingTitle = msg?.event.name || "";
  let city = msg?.event.location;
  let dateParts = msg?.issued["date-parts"];
  let years = dateParts[0][0] || "";
  let months = dateParts[0][1] || "";
  let days = dateParts[0][2] || "";
  let volume = msg?.volume || "";
  let data = {
    title,
    publisher,
    typeResp,
    authorResp,
    authorList,
    proceedingTitle,
    city,
    volume,
    years,
    months,
    days,
  };
  return data;
};

export const compilationCrossrefJournalArticel = (msg) => {
  let typeResp = msg?.type;
  let title = msg?.title[0] || "";
  let authorResp = msg?.author;
  let authorList = authorResp.map((item) => item?.given + item?.family);
  let publisher = msg?.publisher || "";
  let issue = msg?.issue || "";
  let volume = msg?.volume || "";
  let journal = msg["container-title"][0];

  let dateParts = msg?.issued["date-parts"];
  let years = dateParts[0][0] || "";
  let months = dateParts[0][1] || "";
  let days = dateParts[0][2] || "";

  let data = {
    title,
    authorResp,
    authorList,
    publisher,
    journal,
    typeResp,
    issue,
    volume,
    years,
    months,
    days,
  };
  return data;
};

export const showImageGDrive = (fileID) => {
  // https://drive.google.com/file/d/1SdbSvTB1YzVkx7EGORB3cIP2H86_jlDJ/view?usp=share_link
  // https://drive.google.com/uc?export=view&id=1SdbSvTB1YzVkx7EGORB3cIP2H86_jlDJ
  // https://lh3.googleusercontent.com/d/1SdbSvTB1YzVkx7EGORB3cIP2H86_jlDJ=w1000?authuser=1
  let url = `https://drive.google.com/thumbnail?id=${fileID}&sz=w1000`;
  return url;
};

export const showThumbnailGDrive = (fileID, size = "w100") => {
  // https://drive.google.com/file/d/1SdbSvTB1YzVkx7EGORB3cIP2H86_jlDJ/view?usp=share_link
  // https://drive.google.com/uc?export=view&id=1SdbSvTB1YzVkx7EGORB3cIP2H86_jlDJ
  // how to use <img src = { showImageGDrive("1SdbSvTB1YzVkx7EGORB3cIP2H86_jlDJ") }/>
  let url = `https://drive.google.com/thumbnail?id=${fileID}&sz=${size}`;
  return url;
};

export const ellipsisGenerator = (description) => {
  return {
    rows: 2,
    expandable: true,
    symbol: "more",
    tooltip: description,
  };
};
