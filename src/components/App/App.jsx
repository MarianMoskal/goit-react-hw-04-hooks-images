import { useState, useEffect, useCallback } from "react";
import Searchbar from "../../components/Searchbar/Searchbar";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import Button from "../../components/Button/Button";
import fetchData from "../../API/fetchData";
import Modal from "../Modal/Modal";
import { debounce } from "debounce";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "./App.styled";

function App() {
  const [page, setPage] = useState(1);
  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState("");
  const [totalHits, setTotalHits] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loaderVisible, setLoaderVisible] = useState(false);

  const toggleLoaderVisible = () => {
    setLoaderVisible((prevLoaderVisible) => !prevLoaderVisible);
  };

  const handleScroll = useCallback(
    (e) => {
      const node = e.target.scrollingElement;
      const bottom = node.scrollHeight - node.scrollTop === node.clientHeight;
      const ruleForNotify =
        bottom && hits.length === totalHits && hits.length !== 0;

      if (ruleForNotify) {
        return notify();
      }
    },
    [hits, totalHits]
  );

  useEffect(() => {
    window.addEventListener("scroll", debounce(handleScroll, 300));
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, [hits, selectedImage]);

  useEffect(() => {
    if (query.trim() !== "") {
      try {
        setTimeout(() => {
          fetchData(query, page).then(({ data }) => {
            const ruleForNotify =
              data.hits.length !== 0 && data.hits.length === data.totalHits;

            setTotalHits(data.totalHits);
            setHits((prevHits) => [...prevHits, ...data.hits]);
            if (ruleForNotify) {
              notify();
            }
          });
          toggleLoaderVisible();
        }, 1000);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
  }, [page, query]);

  const onSubmit = (e) => {
    e.preventDefault();

    toggleLoaderVisible();

    setPage(1);
    setHits([]);
    setQuery(e.target.textInput.value);

    e.target.textInput.value = "";
  };

  const loadMore = (e) => {
    toggleLoaderVisible();
    setPage(page + 1);
  };

  const handleSelectedImage = (src, alt) => {
    setSelectedImage({ src, alt });
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const notify = () => {
    toast.warn("There are no more images that fit to your query", {
      theme: "colored",
    });
  };

  const rule = hits.length > 11 && !loaderVisible && hits.length < totalHits;

  return (
    <Container>
      <ToastContainer position="top-center" autoClose="off" limit={1} />
      <ToastContainer position="bottom-center" autoClose="off" limit={1} />
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery
        hits={hits}
        visible={loaderVisible}
        onSelect={handleSelectedImage}
        onScroll={handleScroll}
      />
      {rule && <Button onClick={loadMore} />}
      {selectedImage && (
        <Modal selectedImage={selectedImage} closeModal={handleCloseModal} />
      )}
    </Container>
  );
}

export default App;
