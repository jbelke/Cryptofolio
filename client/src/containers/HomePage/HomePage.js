import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import classes from './HomePage.scss';
import * as actions from '../../store/actions/index';

class HomePage extends Component {
  componentDidMount() {
    this.props.getHeadline();
  }

  render() {
    return (
      <Container className={classes.HomePage}>
        <h1>news</h1>
        {this.props.currentTopTenNews.map(news => (
          <Container key={`${news.url}${news.publishedAt}`}>
            <h2>{news.title}</h2>
            <div>
              <img src={news.urlToImage} alt="current news" />
            </div>
            <p>{news.author}</p>
            <p>{news.description}</p>
          </Container>
        ))}
      </Container>
    );
  }
}

// PropTypes
HomePage.propTypes = {
  getHeadline: PropTypes.func.isRequired,
  currentTopTenNews: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  currentTopTenNews: state.news.topTenNews,
});

const mapDispatchToProps = dispatch => ({
  getHeadline: () => dispatch(actions.getTopHeadlines()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
