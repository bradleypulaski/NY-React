import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import DeleteBtn from "../../components/DeleteBtn";

class Saved extends Component {
  state = {
    saved: {}
  };

  loadSavedArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ saved: res.data })
      )
      .catch(err => console.log(err));
  };

  deleteArticle = event => {
    API.deleteArticle(event.target.dataset.id)
      .then(res => this.loadSavedArticles())
      .catch(err => console.log(err));
  };

  componentDidMount = () => {
    this.loadSavedArticles();
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron className="savedheader">
              <h1>
                Saved
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        {this.state.saved.length ?
          this.state.saved.map(Article => {
            return (
              <Row>
                <Col size="md-12">
                <div className="saved">
                  <a target="__blank"  className="left" href={Article.url}>
                    <h4>
                      {Article.title} - {Article.date}
                      </h4>
                  </a>
                  <DeleteBtn onClick={this.deleteArticle} data-id={Article._id} />
                  <br className="clear"/>

               </div>
                </Col>
              </Row>
            )
          })
        : <h3>No Saved Articles</h3>
        }
      </Container>
    );
  }
}

export default Saved;
