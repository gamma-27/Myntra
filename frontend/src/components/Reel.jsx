import React, { useState, useEffect } from 'react';
import './Reel.css';
import { IoChatbubbleOutline, IoShareSocialOutline } from 'react-icons/io5';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backgroundImage from '../images/ss.png';

function Reel() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likes, setLikes] = useState([]);
  const [likeCounts, setLikeCounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch userId from localStorage
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found in localStorage');
      // Optionally handle this case, such as redirecting to login
    }
    // Use userId as needed in your component

    // Load likes from localStorage on component mount
    const likedProducts = JSON.parse(localStorage.getItem('likedProducts')) || {};
    const initialLikes = products.map(product => likedProducts[product._id]);
    setLikes(initialLikes);
  }, [products]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data);
        const initialLikeCounts = response.data.map(product => product.likes);
        setLikeCounts(initialLikeCounts);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  const handleDoubleClick = () => {
    // Fetch userId from localStorage
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found in localStorage');
      // Optionally handle this case, such as redirecting to login
      return;
    }

    // Get the productId of the current product
    const productId = products[currentIndex]._id;

    // Make an axios request to update the like status
    axios.put(`http://localhost:5000/api/products/${productId}/likes`, { action: 'like', userId })
      .then(response => {
        // Assuming the response.data returns the updated product object
        const updatedProduct = response.data;

        // Update likes state based on the updated product
        const newLikes = [...likes];
        newLikes[currentIndex] = true; // Assuming marking as liked
        setLikes(newLikes);

        // Update likeCounts state based on the updated product
        const newLikeCounts = [...likeCounts];
        newLikeCounts[currentIndex] = updatedProduct.likes;
        setLikeCounts(newLikeCounts);

        // Update localStorage with liked product
        const likedProducts = JSON.parse(localStorage.getItem('likedProducts')) || {};
        likedProducts[productId] = true;
        localStorage.setItem('likedProducts', JSON.stringify(likedProducts));

        // Show success toast notification
        toast.success('You have liked this product!');

        // Make another axios request to add product to user's liked products
        axios.put(`http://localhost:5000/api/users/${userId}/liked-products/${productId}`)
          .then(userResponse => {
            // Handle success if needed
          })
          .catch(userError => {
            console.error('Error adding product to user\'s liked products:', userError);
            toast.error('Failed to add product to user\'s liked products');
          });

      })
      .catch(error => {
        console.error('Error updating like count:', error);
        toast.error('Failed to update like count');
      });
  };

  const handleScroll = () => {
    if (products.length > 0) {
      const nextIndex = (currentIndex + 1) % products.length;

      // Smooth scrolling effect with 2 seconds transition
      setTimeout(() => {
        setCurrentIndex(nextIndex);
      }, 500); // Adjust the timeout duration to 2000 milliseconds (2 seconds)
    }
  };

  useEffect(() => {
    const handleWheel = () => {
      handleScroll();
    };

    window.addEventListener('wheel', handleWheel);

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [currentIndex, products.length]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (products.length === 0) {
    return <div>No products found</div>;
  }

  const currentProduct = products[currentIndex];
  if (!currentProduct) {
    return <div>Product not found at currentIndex {currentIndex}</div>;
  }

  return (
    <div className=""  style={{ backgroundImage: "url('https://img.freepik.com/free-photo/fast-fashion-vs-slow-sustainable-fashion_23-2149133987.jpg?t=st=1720633085~exp=1720636685~hmac=d7b69771dbb039dc1054f82bbd2e2a2da5442d4fcc98acac5270a889ffe092c6&w=360') " }} >
      <div className="flex justify-center items-center">
        <div className="relative w-72 h-[27rem] flex justify-center items-center overflow-hidden border-4 border-gold-500 rounded-lg shadow-md">
          <div className="" onDoubleClick={handleDoubleClick}>
            <img
              src={currentProduct.imageUrl}
              alt={currentProduct.product}
              className={`outfit-image ${likes[currentIndex] ? 'liked' : ''}`}
            />
            <div className="absolute bottom-8 right-4 flex flex-col items-center justify-center pointer-events-none">
              <div className="flex-col">
                <div className='ml-4'>
                  <span
                    role="img"
                    aria-label=""
                    className={`heart ${likes[currentIndex] ? 'active' : ''}`}
                  >
                    {likes[currentIndex] ? '❤️' : '🤍'}
                  </span>
                  <div className="ml-[0.7rem] text-white">{likeCounts[currentIndex]}</div>
                </div>
              </div>

              <div className="text-2xl text-gray-800  mt-2 ml-4">
                💬
                <div className=" mt-2 ml-2 font-normal text-white text-sm">101</div>
              </div>
              <div className="text-2xl text-gray-800  mt-4 ml-4">
                🛍️
                <div className=" mt-2 ml-2 font-normal text-white text-sm">38</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reel;
