// TableRow.js

import React, { Component } from 'react';
import { Link,} from 'react-router-dom';
import axios from 'axios';



class TableRow extends Component {

  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);

  }
  delete() {
    axios.get('http://localhost:4000/Category/delete/' + this.props.obj._id)
      .then(console.log('Deleted'))
      .catch(err => console.log(err))

  }
  
  render() {
    return (
      <tr>
        <td>
          {this.props.obj.category_name}
        </td>
        <td>
          {this.props.obj.category_description}
        </td>
        <td>
          {this.props.obj.is_active}
        </td>

        <td>
          <Link to={"/edit/"+this.props.obj._id} className="btn btn-primary">Edit</Link>
        </td>
        <td>
          <button onClick={this.delete} className="btn btn-danger">Delete</button>

        </td>
      </tr>
    );
  }
}

export default TableRow;
