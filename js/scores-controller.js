
$( document ).ready(async function() {
  console.log({ topRecords });
  records = topRecords
    ? await getRecords()
    : await getRecordsByUser('conde');

  let columns = '';
  for (const record of records) {
    columns += `<tr>
                       <td>${record.username}</td>
                       <td>${record.punctuation}</td>
                       <td>${record.cards}</td>
                       <td>${record.disposedTime}</td>
                       <td>${formatDate(record.recordDate)}</td>
                  </tr>`
  }
  $("#records > tbody").html(columns);

  function formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [day, month, year].join('/');
  }

});

/*
* <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>

*
* */