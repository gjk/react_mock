import * as React from 'react'
import '../../assets/scss/details.scss'

// 类组件
export class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: { title: null, createTime: null, description: null}
    };
  }

  componentDidMount() {
    if (this.props.match.params.id){
      $api.details({ id: this.props.match.params.id}).then(data => {
        this.setState({ project: data.project })
      })
    }
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    return (
      <article className="project-details">
        <div className="details-title">{this.state.project.title}</div>
        <div className="details-datetime">{this.state.project.createTime}</div>
        <div className="details-desc">{this.state.project.description}</div>
      </article>
    );
  }
}
