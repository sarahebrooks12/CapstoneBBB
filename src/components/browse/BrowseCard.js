import React, { Component } from "react";
import {
  Card,
  Icon,
  Image,
  Button,
  Modal,
  Header,
  Checkbox,
  Dropdown,
  Grid,
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import BookManager from "../../modules/BookManager";
import "./Browse.css";
// import { NavLink, withRouter } from "react-router-dom";

class Browse extends Component {
  state = {
    titleSearch: "",
    authorSearch: "",
    items: [],
    ratingId: "",
    favorite: false,
  };


  handleDropDownChange = (event, { value }) => {
    this.setState({ ratingId: value });
  };
  //evt.target.checked=true or false
  //setState
  //set Favorite property in state to either true or false
  handleFavorite = (event, { checked }) => {
    this.setState({ favorite: checked });
  };

  handleFieldChange = (evt) => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
    // console.log(evt.target)
  };
 
  createNewBook = (evt) => {
    console.log(this.state.ratingId);
    evt.preventDefault();
    const bookObject = {
      title: this.props.searchProp.volumeInfo.title,
      author: this.props.searchProp.volumeInfo.authors,
      ratingId: this.state.ratingId,
      googleBooksRating: this.props.searchProp.volumeInfo.averageRating,
      image: this.props.searchProp.volumeInfo.imageLinks.smallThumbnail,
      userId: 1,
      favorite: this.state.favorite,
    };
    BookManager.postBook(bookObject).then(() =>
      this.props.history.push("/myBookshelf")
    );
  };

  render() {
    return (
      <div>
        <Grid columns={3} divided>
          <Grid.Row>
                <Card id="cardSize">
                  {this.props.searchProp.volumeInfo.imageLinks ? (
                    <Image
                    id="imageSize"
                      src={
                        this.props.searchProp.volumeInfo.imageLinks
                          .smallThumbnail
                      }
                      wrapped
                      size="small"
                      ui={false}
                    />
                  ) : (
                    <Image
                    id="imageNotAvail"
                      src={require("./No_Img_Avail.jpg")}
                      alt="Not Available"
                      size="small"
                    />
                  )}

                  <Card.Content>
                    <Card.Header>
                      {this.props.searchProp.volumeInfo.title}
                    </Card.Header>
                    <Card.Meta>
                      <span>{this.props.searchProp.volumeInfo.authors}</span>
                    </Card.Meta>
                    <div className="ui divider">
                      <a>
                        <Icon name="star" />
                        {this.props.searchProp.volumeInfo.averageRating}
                      </a>
                    </div>
                  </Card.Content>
                  <Modal
                fluid={true}
                  trigger={
                    <Button span animated>
                      <Button.Content visible>Add to Shelf</Button.Content>
                      <Button.Content hidden>
                        <Icon name="book" />
                      </Button.Content>
                    </Button>
                  }
                >
                  <Modal.Header>
                    {this.props.searchProp.volumeInfo.title}
                  </Modal.Header>
                  <Modal.Content image>
                    {this.props.searchProp.volumeInfo.imageLinks ? (
                      <Image
                        src={
                          this.props.searchProp.volumeInfo.imageLinks
                            .smallThumbnail
                        }
                        wrapped
                        size="small"
                        ui={false}
                      />
                    ) : (
                      <Image
                        src={require("./No_Img_Avail.jpg")}
                        alt="Not Available"
                        size="small"
                      />
                    )}
                    <Modal.Description>
                      <Header>
                        {this.props.searchProp.volumeInfo.authors}
                      </Header>
                      {this.props.searchProp.volumeInfo.description}
                    </Modal.Description>
                  </Modal.Content>

                  <Checkbox label="Favorite" onChange={this.handleFavorite} />
                  <Dropdown
                    placeholder="Select Rating"
                    fluid
                    selection
                    options={this.props.ratingProp}
                    onChange={this.handleDropDownChange}
                  />
                  <br />

                  <Button animated onClick={this.createNewBook}>
                    <Button.Content visible>Add to Shelf</Button.Content>
                    <Button.Content hidden>
                      <Icon name="book" />
                    </Button.Content>
                  </Button>
                </Modal>
                </Card>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
export default withRouter(Browse);
