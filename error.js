let text = "abc123" + "cde998"
var neverReassingned = {};
neverReassingned.name = "christopher arthur"

var tobeReassined = {}
tobeReassined = { name: "chris" }
tobeReassined.name = 1
tobeReassined = 0
tobeReassined = { name: "chris" }

let result = text.split(",").map(letter => {
  return letter.toUpperCase()
}).join(".")
console.log(result)