// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const assignment = document.querySelector( "#assignment" ),
        pointsEarned = document.querySelector( "#pointsEarned" ),
        pointsAvailable = document.querySelector( "#pointsAvailable" ),
        json = { assignment: assignment.value, pointsEarned: pointsEarned.value, pointsAvailable: pointsAvailable.value },
        body = JSON.stringify( json )

  const response = await fetch( "/submit", {
    method:"POST",
    body 
  })

  const text = await response.text()
  console.log( "text:", text )
  getData()
  clearForm()
}

async function clearForm() {
  const assignment2 = document.querySelector( "#assignment" ),
        pointsEarned2 = document.querySelector( "#pointsEarned" ),
        pointsAvailable2 = document.querySelector( "#pointsAvailable" )

  assignment2.value = ''
  pointsEarned2.value = ''
  pointsAvailable2.value = ''
}

async function getData() {
  const response = await fetch( "/appdata", {
    method: "GET"
  })
  const text = await response.text()
  console.log("Data retrieved")

  createTable(text)
}

async function createTable(d) {
  var table = document.querySelector("#datatable")
  table.innerHTML = ''
  const data = JSON.parse(d)

  var titles = table.insertRow()
  const assignment3 = titles.insertCell()
  assignment3.innerHTML = "Assignments"
  const pointsEarned3 = titles.insertCell()
  pointsEarned3.innerHTML = "Points Earned"
  const pointsAvailable3 = titles.insertCell()
  pointsAvailable3.innerHTML = "Points Available"
  const grade = titles.insertCell()
  grade.innerHTML = "Grade"

  for(const entry of data) {
    var row = table.insertRow()
    var assignmentCell = row.insertCell()
    assignmentCell.id = "assignmentCell"
    var pointsEarnedCell = row.insertCell()
    pointsEarnedCell.id = "pointsEarnedCell"
    var pointsAvailableCell = row.insertCell()
    pointsAvailableCell.id = "pointsAvailableCell"
    var gradeCell = row.insertCell()
    gradeCell.id = "gradeCell"

    assignmentCell.innerHTML = entry.assignment
    pointsEarnedCell.innerHTML = entry.pointsEarned
    pointsAvailableCell.innerHTML = entry.pointsAvailable
    gradeCell.innerHTML = entry.grade
  }
}

async function calculateTotalGrade() {
  const response = await fetch( "/appdata", {
    method: "GET"
  })
  const text = await response.text()

  var count = 0;
  var count2 = 0;
  for(const grade of text) {
    count += grade.pointsEarned
    count2 += grade.pointsAvailable
  }

  averageGrade = count/count2
  console.log(averageGrade)
}

window.onload = function() {
    const submitButton = document.querySelector("button#submit");
  submitButton.onclick = submit;
  getData()
  calculateTotalGrade()
}