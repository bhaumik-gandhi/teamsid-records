export default class RecordDetail extends React.Component {
  render() {
    let record = this.props.record || {};
    return <div>
      {record.description}
    </div>
  }
}