import * as React from 'react'
import { Link } from 'react-router-dom'
import '../../assets/scss/list.scss'

// 类组件
export class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: []
    };
  }

  componentDidMount() {
    $api.list({}).then(data => {
      this.setState({ projectList: data.list })
    })
  }

  componentWillUnmount() {
    // this.setState = (state, callback) => {
    //   return;
    // };
  }

  render() {
    return (
      <article className="list">
        {this.state.projectList.map(item => {
          return (<section key={item.id}>
              <Link to={'/project/details/'+item.id}>{item.id} + {item.title} + {item.createTime} + {item.description}</Link>
            </section>)
        })}
      </article>
    );
  }
}
