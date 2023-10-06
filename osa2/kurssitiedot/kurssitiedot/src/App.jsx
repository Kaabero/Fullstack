
const Header = ({ course }) => <h1>{course}</h1>

const Sum = props => {
  const sum = props.parts.reduce(
    (prevValue, currentValue) => prevValue + currentValue.exercises,
    0
  );
  return <strong>total of {sum} exercises</strong>;
};


const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return parts.map((part) => (
    <Part
      key={part.id}
      part={part} 
    />
    )
  )
}

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
      id: 1,
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      id: 2,
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      id: 3,
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Course course={course} parts={parts}/>
      <Sum parts={parts} />
    </div>
  )
}

export default App
