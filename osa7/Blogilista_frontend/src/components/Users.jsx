import User from './User'

const Users = ({ users }) => (
  <div>
    <h1>Blog app</h1>
    <h2>Users</h2>

    <table id="users">
      <thead>
        <tr>
          <th>User</th>
          <th>Blogs created</th>
        </tr>
      </thead>
    </table>

    {users.map((user) => (
      <User key={user.id} user={user} />
    ))}
  </div>
)

export default Users
