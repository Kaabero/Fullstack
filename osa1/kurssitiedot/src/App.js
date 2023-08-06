const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = () => {
  return (
    <div>
      <Part name="Fundamentals of React" exercises={10} />
      <Part name="Using props to pass data" exercises={7} />
      <Part name="State of a component" exercises={14} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.total}</p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.name} {props.exercises}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'

  return (
    <div>
      <Header course={course} />
      <Content />
      <Total total={10+7+14} />
    </div>
  )
}


export default App

