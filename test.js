var data = [
    {
    "username": "test_elek1",
    "cr": 0
  },
  {
    "username": "test_elek2",
    "cr": 20
  },
  {
    "username": "test_elek3",
    "cr": 57000
  },
  {
    "username": "test",
    "cr": 0
  },
  {
    "username": "anyukád",
    "cr": 0
  },
  {
    "username": "test1",
    "cr": 5
  },
  {
    "username": "zsiga",
    "cr": 0
  },
  {
    "username": "l",
    "cr": 500
  },
  {
    "username": "anyud",
    "cr": 0
  }
];

data.sort(function (a,b){
    return b.cr - a.cr;
});
console.log(data);