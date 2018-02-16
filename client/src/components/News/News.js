import React from 'react';
import { Container, Header, Grid, Segment, Divider, Image, Responsive } from 'semantic-ui-react';
import newsPlaceholder from '../../assets/news-placeholder.png';
import classes from './News.scss';

const currentNews = (props) => {
  const topNews = props.currentTopTenNews.map(news => (
    <Container className={classes.News} key={`${news.url}${news.publishedAt}`}>
      <Grid as="a" href={news.url} target="_blank" stackable stretched relaxed>
        <Grid.Row as={Segment} className={classes.NewsArticle} >
          <Grid.Column width={4}>
            { news.urlToImage === null
              ?
                <Image
                  size="medium"
                  src={newsPlaceholder}
                  alt="News"
                />
              :
                <Image
                  size="medium"
                  src={news.urlToImage}
                  alt="News"
                />
            }
          </Grid.Column>

          <Grid.Column width={12}>
            <Grid.Row>
              <Header
                as="h2"
              >
                {news.title}
                <Header.Subheader>
                  <p>{news.author} @ {news.source.name}</p>
                </Header.Subheader>
              </Header>
            </Grid.Row>

            <Responsive as={Grid.Row} minWidth={768} >
              <Divider />
              <p>{news.description}</p>
            </Responsive>

          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  ));

  return topNews;
};


export default currentNews;