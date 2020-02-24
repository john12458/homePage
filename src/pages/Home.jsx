import React from 'react';
import '../App.css';
import {Container,Button} from "../component";
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
        <Container>
            <div>
                <Button >Normal</Button>
		            <Button primary>Primary</Button>
           </div>
                <p>
                    歡迎光臨
                    <a style={{ color: "rgba(255,255,255,0)" }}>............................</a>
                </p>
                <p>
                    建置中...敬請期待
                </p>
            
        </Container>
    );
  }
}


