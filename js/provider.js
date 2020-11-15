const URL = "http://fenw.etsisi.upm.es:10000";

async function getRecords() {
   const response = await axios.get(`${URL}/records`);
   return response.data;
}

async function getRecordsByUser(username) {
   const headers = {
      Authorization: localStorage.getItem('jwt'),
   };
   console.log({ headers });
   const response = await axios.get(`${URL}/records/${username}`, { headers });
   return response.data;
}

async function registerUser(user) {
   const response = await axios.post(`${URL}/users`, user);
   return response.status === 201;
}

async function loginUser(user) {
   const response = await axios.get(
     `${URL}/users/login?username=${user.username}&password=${user.password}`,
     user,
   );
   localStorage.setItem('jwt', response.data);
   return response.status === 200;
}


async function createRecord(record) {
   const headers = {
      Authorization: localStorage.getItem('jwt'),
   };
   const response = await axios.post(
     `${URL}/records`,
     record,
     { headers },
     );
   return response.status === 201;
}

