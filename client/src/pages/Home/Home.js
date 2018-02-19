import React, { Component } from "react";
import SaveBtn from "../../components/SaveBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import Modal from 'react-responsive-modal';

class Articles extends Component {
  state = {
    articles: [],
    query: "",
    title: "",
    date: "",
    url: "",
    open: false,
    saved: ""
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
  }

  saveArticle = event => {
    const title = event.target.dataset.title;
    const url = event.target.dataset.url;
    const date = event.target.dataset.date;
    API.saveArticle({ title: title, url: url, date: date })
      .then(
      res => {
        this.setState({ saved: title });
        this.onOpenModal();
      }
      );
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.query) {
      API.scrape({
        query: this.state.query
      })
        .then(res => {
          this.setState({ articles: res.data });
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Modal open={this.state.open} onClose={this.onCloseModal} little>
          <h2>Congratulations! Article: {this.state.saved} was saved!</h2>
        </Modal>
        <Row>
          <Col size="xl-6 lg-12">
            <Jumbotron  className="searchheader">
            
            </Jumbotron>
            <form>
              <Input
                value={this.state.query}
                onChange={this.handleInputChange}
                name="query"
                placeholder="Search (required)"
              />
              <FormBtn
                disabled={!(this.state.query)}
                onClick={this.handleFormSubmit}
              >
                Search Articles
              </FormBtn>
            </form>
          </Col>
          <Col size="xl-6 lg-12">
            <Jumbotron  className="resultsheader">
              <h1>Results</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(Article => (
                  <ListItem key={Article.web_url}>
                    <a target="__blank" href={Article.web_url}>
                      <strong>
                        {Article.headline.main}
                      </strong>
                    </a>
                    <SaveBtn onClick={this.saveArticle} data-date={Article.pub_date} data-url={Article.web_url} data-title={Article.headline.main} />
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
