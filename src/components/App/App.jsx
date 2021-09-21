import { Component } from "react";
import Searchbar from "../../components/Searchbar/Searchbar";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import Button from "../../components/Button/Button";
import fetchData from "../../API/fetchData";
import Modal from "../Modal/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "./App.styled";

class App extends Component {
  state = {
    data: {},
    hits: [],
    query: "",
    page: 1,
    selectedImage: null,
    loaderVisible: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, data, hits, selectedImage, query } = this.state;
    const ruleForScrollTo =
      page !== prevState.page || selectedImage !== prevState.selectedImage;
    const ruleForNotify =
      hits.length === data.totalHits &&
      selectedImage === null &&
      query === prevState.query;

    if (ruleForScrollTo) {
      console.log(`wow  ${this.state.selectedImage}`);
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }

    if (ruleForNotify) {
      setTimeout(this.notify, 3000);
    }
  }

  handleInput = (e) => {
    this.setState({ query: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    this.toggleLoaderVisible();
    e.target.textInput.value = "";

    this.setState({ page: 1, hits: [] }, () => {
      this.handleFetchResponse();
    });
  };

  loadMore = (e) => {
    this.toggleLoaderVisible();
    setTimeout(
      this.setState({ page: this.state.page + 1 }, () => {
        this.handleFetchResponse();
      }),
      2000
    );
  };

  handleFetchResponse = () => {
    try {
      fetchData(this.state).then(({ data }) => {
        // console.log(data);
        this.setState((state) => ({
          data,
          hits: [...state.hits, ...data.hits],
        }));
        this.toggleLoaderVisible();
      });
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  handleSelectedImage = (src, alt) => {
    this.setState({ selectedImage: { src, alt } });
  };

  toggleLoaderVisible = () => {
    this.setState({ loaderVisible: !this.state.loaderVisible });
  };

  handleCloseModal = () => {
    this.setState(
      { selectedImage: null },
      console.log(`close me, ${this.state.selectedImage}`)
    );
  };

  notify = () => {
    toast.warn("There are no more images that fit to your query", {
      theme: "colored",
    });
  };

  render() {
    // console.log(`shit, ${this.state.selectedImage}`);
    const { hits, loaderVisible, selectedImage, data } = this.state;
    const rule =
      hits.length > 11 && !loaderVisible && hits.length < data.totalHits;

    return (
      <Container>
        <ToastContainer position="bottom-center" autoClose="off" />
        <Searchbar onSubmit={this.onSubmit} onChange={this.handleInput} />
        <ImageGallery
          hits={hits}
          visible={loaderVisible}
          onSelect={this.handleSelectedImage}
        />
        {rule && <Button onClick={this.loadMore} />}
        {selectedImage && (
          <Modal
            selectedImage={selectedImage}
            closeModal={this.handleCloseModal}
          />
        )}
      </Container>
    );
  }
}

export default App;
