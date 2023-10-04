
const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return parts.map((part, i) => (
    <Part
      key={i}
      part={part} 
    />
  ))}

const Course = ({ course, parts }) => { 
  console.log(course)

  return (
    <div>
    <Header course={course} />
    <Content parts={parts} />
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Course course={course} parts={parts}/>
    </div>
  )
}

export default App
