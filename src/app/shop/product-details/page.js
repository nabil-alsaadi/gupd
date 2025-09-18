"use client"
import React, { useState } from 'react'
import Header1 from '@/components/header/Header1'
import Breadcrum from '@/components/common/Breadcrum'
import Footer1 from '@/components/Footer/Footer1'
import Link from 'next/link'
import Home1FooterTop from '@/components/Footer/Home1FooterTop'

const ProductDetails = () => {

  const [quantity, setQuantity] = useState(1)
  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1)
  }

  const decrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity > 1 ? prevQuantity - 1 : 1)
  }
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleSelect = (index) => {
    setSelectedIndex(index);
  };
  return (
    <div>
      <Header1 fluid={"container-fluid"} />
      <Breadcrum content='Your Product Verify' pageTitle={'Product Details'} pagename={'Product Details'} />

      <div className="product-details-top-section pt-120 mb-120">
        <div className="container">
          <div className="row gy-5">
            <div className="col-lg-6">
              <div className="product-details-img">
                <div className="tab-content" id="v-pills-tabContent">
                  <div className="tab-pane fade show active" id="v-pills-img1" role="tabpanel">
                    <div className="product-details-tab-img">
                      <img src="/assets/img/inner-pages/product-details-tab-img1.jpg" alt="" />
                    </div>
                  </div>
                  <div className="tab-pane fade" id="v-pills-img2" role="tabpanel">
                    <div className="product-details-tab-img">
                      <img src="/assets/img/inner-pages/product-details-tab-img2.jpg" alt="" />
                    </div>
                  </div>
                  <div className="tab-pane fade" id="v-pills-img3" role="tabpanel" aria-labelledby="v-pills-img3-tab">
                    <div className="product-details-tab-img">
                      <img src="/assets/img/inner-pages/product-details-tab-img3.jpg" alt="" />
                    </div>
                  </div>
                  <div className="tab-pane fade" id="v-pills-img4" role="tabpanel" aria-labelledby="v-pills-img4-tab">
                    <div className="product-details-tab-img">
                      <img src="/assets/img/inner-pages/product-details-tab-img4.jpg" alt="" />
                    </div>
                  </div>
                </div>
                <div className="nav nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                  <button className="nav-link active" id="v-pills-img1-tab" data-bs-toggle="pill" data-bs-target="#v-pills-img1" type="button" role="tab" aria-controls="v-pills-img1" aria-selected="true">
                    <img src="/assets/img/inner-pages/product-details-nav-img1.png" alt="" />
                  </button>
                  <button className="nav-link" id="v-pills-img2-tab" data-bs-toggle="pill" data-bs-target="#v-pills-img2" type="button" role="tab" aria-controls="v-pills-img2" aria-selected="false">
                    <img src="/assets/img/inner-pages/product-details-nav-img2.png" alt="" />
                  </button>
                  <button className="nav-link" id="v-pills-img3-tab" data-bs-toggle="pill" data-bs-target="#v-pills-img3" type="button" role="tab" aria-controls="v-pills-img3" aria-selected="false">
                    <img src="/assets/img/inner-pages/product-details-nav-img3.png" alt="" />
                  </button>
                  <button className="nav-link" id="v-pills-img4-tab" data-bs-toggle="pill" data-bs-target="#v-pills-img4" type="button" role="tab" aria-controls="v-pills-img4" aria-selected="false">
                    <img src="/assets/img/inner-pages/product-details-nav-img4.png" alt="" />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="product-details-content">
                <h2>Brand Drill Machine.</h2>
                <div className="rating-review">
                  <div className="rating">
                    <div className="star">
                      <i className="bi bi-star-fill" />
                      <i className="bi bi-star-fill" />
                      <i className="bi bi-star-fill" />
                      <i className="bi bi-star-fill" />
                      <i className="bi bi-star-fill" />
                    </div>
                    <p><a href="#reviews">(50 customer review)</a></p>
                  </div>
                </div>
                <p>Aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos only
                  placerat felis non aliquam.Mauris nec justo vitae ante auctor tol euismod sit amet
                  Praesent commodo at massa eget suscipit. Utani vitae enim velit.</p>
                <div className="price-area">
                  <h4>$150.00 <del>$200.00</del></h4>
                </div>
                <div className="quantity-color-area">
                  <div className="quantity-color">
                    <h6 className="widget-title">Quantity</h6>
                    <div className="quantity-counter">

                      <a onClick={decrementQuantity} className="quantity__minus"><i className="bx bx-minus" /></a>
                      <input name="quantity" type="text" onChange={ () => {} } className="quantity__input" value={quantity} />
                      <a onClick={incrementQuantity} className="quantity__plus"><i className="bx bx-plus" /></a>
                    </div>
                  </div>
                  <div className="quantity-color">
                    <h6 className="widget-title">Color</h6>
                    <ul className="color-list">
                      {[1, 2, 3,4,5,6].map((item, index) => (
                        <li
                          key={index}
                          className={`select-wrap ${selectedIndex === index ? 'selected' : ''}`}
                          onClick={() => handleSelect(index)}
                        >
                          <span />
                        </li>
                      ))}
                      {/*                      
                      <li className="select-wrap"><span /></li>
                      <li className="select-wrap"><span /></li>
                      <li className="select-wrap"><span /></li>
                      <li className="select-wrap"><span /></li>
                      <li className="select-wrap"><span /></li> */}
                    </ul>
                  </div>
                </div>
                <div className="product-details-btn">
                  <Link href="/shop/checkout" className="primary-btn2">
                    <span>
                      Buy Now
                      <svg viewBox="0 0 13 20">
                        <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                      </svg>
                    </span>
                  </Link>
                  <Link href="/shop/cart" className="primary-btn2 transparent">
                    <span>
                      Add to Cart
                      <svg viewBox="0 0 13 20">
                        <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                      </svg>
                    </span>
                  </Link>
                </div>
                <div className="product-info">
                  <ul className="product-info-list">
                    <li> <span>SKU:</span> 9852410</li>
                    <li> <span>Brand:</span> <Link href="/shop">Chanel</Link></li>
                    <li> <span>Color:</span> Mid Brown</li>
                  </ul>
                </div>
                <div className="payment-method">
                  <h6>Guaranted Safe Checkout</h6>
                  <ul className="payment-card-list">
                    <li><img src="/assets/img/inner-pages/icon/payment-img1.svg" alt="" /></li>
                    <li><img src="/assets/img/inner-pages/icon/payment-img2.svg" alt="" /></li>
                    <li><img src="/assets/img/inner-pages/icon/payment-img3.svg" alt="" /></li>
                    <li><img src="/assets/img/inner-pages/icon/payment-img4.svg" alt="" /></li>
                    <li><img src="/assets/img/inner-pages/icon/payment-img5.svg" alt="" /></li>
                    <li><img src="/assets/img/inner-pages/icon/payment-img6.svg" alt="" /></li>
                    <li><img src="/assets/img/inner-pages/icon/payment-img7.svg" alt="" /></li>
                  </ul>
                </div>
                <div className="wishlist-area">
                  <a href="#">
                    <span>
                      <svg width={11} height={11} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_168_378)">
                          <path d="M16.528 2.20919C16.0674 1.71411 15.5099 1.31906 14.8902 1.04859C14.2704 0.778112 13.6017 0.637996 12.9255 0.636946C12.2487 0.637725 11.5794 0.777639 10.959 1.048C10.3386 1.31835 9.78042 1.71338 9.31911 2.20854L9.00132 2.54436L8.68352 2.20854C6.83326 0.217151 3.71893 0.102789 1.72758 1.95306C1.63932 2.03507 1.5541 2.12029 1.47209 2.20854C-0.490696 4.32565 -0.490696 7.59753 1.47209 9.71463L8.5343 17.1622C8.77862 17.4201 9.18579 17.4312 9.44373 17.1868C9.45217 17.1788 9.46039 17.1706 9.46838 17.1622L16.528 9.71463C18.4907 7.59776 18.4907 4.32606 16.528 2.20919ZM15.5971 8.82879H15.5965L9.00132 15.7849L2.40553 8.82879C0.90608 7.21113 0.90608 4.7114 2.40553 3.09374C3.76722 1.61789 6.06755 1.52535 7.5434 2.88703C7.61505 2.95314 7.68401 3.0221 7.75012 3.09374L8.5343 3.92104C8.79272 4.17781 9.20995 4.17781 9.46838 3.92104L10.2526 3.09438C11.6142 1.61853 13.9146 1.52599 15.3904 2.88767C15.4621 2.95378 15.531 3.02274 15.5971 3.09438C17.1096 4.71461 17.1207 7.2189 15.5971 8.82879Z" />
                        </g>
                      </svg>
                    </span>
                    Add to wishlist
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="product-details-description-section mb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="product-details-description-nav mb-50">
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active" id="nav-description-tab" data-bs-toggle="tab" data-bs-target="#nav-description" type="button" role="tab" aria-controls="nav-description" aria-selected="true">Description</button>
                    <button className="nav-link" id="nav-add-info-tab" data-bs-toggle="tab" data-bs-target="#nav-add-info" type="button" role="tab" aria-controls="nav-add-info" aria-selected="false">Additional Information</button>
                    <button className="nav-link" id="nav-reviews-tab" data-bs-toggle="tab" data-bs-target="#nav-reviews" type="button" role="tab" aria-controls="nav-reviews" aria-selected="false">Reviews (15)</button>
                  </div>
                </nav>
              </div>
              <div className="product-details-description-tab">
                <div className="tab-content" id="nav-tabContent">
                  <div className="tab-pane fade show active" id="nav-description" role="tabpanel" aria-labelledby="nav-description-tab">
                    <div className="row gy-5">
                      <div className="col-lg-3">
                        <div className="description-content">
                          <div className="description-left-content1">
                            <h6>Lobortis arcu varius sed</h6>
                            <p>Software development is the process offer creatain onet computer.</p>
                          </div>
                          <div className="description-left-content2">
                            <h6>Mauris arcu mollis nulla</h6>
                            <p>Software development is the process offer creatain onet computer.</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 d-flex align-items-center justify-content-center">
                        <div className="description-tab-img">
                          <img src="/assets/img/inner-pages/product-details-description-img.png" alt="" className="d-lg-block d-none" />
                          <img src="/assets/img/inner-pages/product-details-description-img2.png" alt="" className="d-lg-none d-block" />
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="description-content">
                          <div className="description-right-content1">
                            <h6>Etiam vitae malesu adan</h6>
                            <p>Software development is the process offer creatain onet computer.</p>
                          </div>
                          <div className="description-right-content2">
                            <h6>Nam tempor laoreet conv</h6>
                            <p>Software development is the process offer creatain onet computer.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="nav-add-info" role="tabpanel" aria-labelledby="nav-add-info-tab">
                    <div className="addithonal-information">
                      <table className="table total-table2">
                        <tbody>
                          <tr>
                            <td>SKU</td>
                            <td>123ABC</td>
                          </tr>
                          <tr>
                            <td>Category</td>
                            <td>Nail Polish</td>
                          </tr>
                          <tr>
                            <td>Tags</td>
                            <td>Nail Care, Nail Art</td>
                          </tr>
                          <tr>
                            <td>Weight</td>
                            <td>20 gm</td>
                          </tr>
                          <tr>
                            <td>Dimensions</td>
                            <td>2 × 4 × 5 cm</td>
                          </tr>
                          <tr>
                            <td>Brand</td>
                            <td>Revlon </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="nav-reviews" role="tabpanel" aria-labelledby="nav-reviews-tab">
                    <div className="reviews-area">
                      <div className="row g-lg-4 gy-5">
                        <div className="col-lg-7">
                          <div className="number-of-review">
                            <h4>Review (03) :</h4>
                          </div>
                          <div className="review-list-area">
                            <ul className="comment">
                              <li>
                                <div className="single-comment-area">
                                  <div className="author-img">
                                    <img src="/assets/img/inner-pages/comment-author-01.jpg" alt="" />
                                  </div>
                                  <div className="comment-content">
                                    <div className="author-and-review">
                                      <div className="author-name-deg">
                                        <h6>Mr. Bowmik Haldar,</h6>
                                        <span>05 January, 2024</span>
                                      </div>
                                      <ul className="review d-flex flex-row align-items-center">
                                        <li><i className="bi bi-star-fill" /></li>
                                        <li><i className="bi bi-star-fill" /></li>
                                        <li><i className="bi bi-star-fill" /></li>
                                        <li><i className="bi bi-star-fill" /></li>
                                        <li><i className="bi bi-star-fill" /></li>
                                      </ul>
                                    </div>
                                    <p>However, here are some well-regarded car dealerships known for their customer service, inventory, and overall reputation. It's always a good idea to research and read reviews specific...</p>
                                    <div className="replay-btn">
                                      <svg xmlns="http://www.w3.org/2000/svg" width={14} height={11} viewBox="0 0 14 11">
                                        <path d="M8.55126 1.11188C8.52766 1.10118 8.50182 1.09676 8.47612 1.09903C8.45042 1.1013 8.42569 1.11018 8.40419 1.12486C8.3827 1.13954 8.36513 1.15954 8.35311 1.18304C8.34109 1.20653 8.335 1.23276 8.33539 1.25932V2.52797C8.33539 2.67388 8.2791 2.81381 8.17889 2.91698C8.07868 3.02016 7.94277 3.07812 7.80106 3.07812C7.08826 3.07812 5.64984 3.08362 4.27447 3.98257C3.2229 4.66916 2.14783 5.9191 1.50129 8.24735C2.59132 7.16575 3.83632 6.57929 4.92635 6.2679C5.59636 6.07737 6.28492 5.96444 6.97926 5.93121C7.26347 5.91835 7.54815 5.92129 7.83205 5.94001H7.84594L7.85129 5.94111L7.80106 6.48906L7.85449 5.94111C7.98638 5.95476 8.10864 6.01839 8.19751 6.11966C8.28638 6.22092 8.33553 6.35258 8.33539 6.48906V7.75771C8.33539 7.87654 8.45294 7.95136 8.55126 7.90515L12.8088 4.67796C12.8233 4.66692 12.8383 4.65664 12.8537 4.64715C12.8769 4.63278 12.8962 4.61245 12.9095 4.58816C12.9229 4.56386 12.9299 4.53643 12.9299 4.50851C12.9299 4.4806 12.9229 4.45316 12.9095 4.42887C12.8962 4.40458 12.8769 4.38425 12.8537 4.36988C12.8382 4.36039 12.8233 4.35011 12.8088 4.33907L8.55126 1.11188ZM7.26673 7.02381C7.19406 7.02381 7.11391 7.02711 7.02842 7.03041C6.56462 7.05242 5.92342 7.12504 5.21169 7.32859C3.79464 7.7335 2.11684 8.65116 1.00115 10.7175C0.940817 10.8291 0.844683 10.9155 0.729224 10.9621C0.613765 11.0087 0.486168 11.0124 0.368304 10.9728C0.250441 10.9331 0.149648 10.8525 0.0831985 10.7447C0.0167484 10.6369 -0.011219 10.5086 0.0040884 10.3819C0.499949 6.29981 2.01959 4.15202 3.70167 3.05391C5.03215 2.18467 6.40218 2.01743 7.26673 1.98552V1.25932C7.26663 1.03273 7.32593 0.810317 7.43839 0.615545C7.55084 0.420773 7.71227 0.260866 7.90565 0.152696C8.09902 0.0445258 8.31717 -0.00789584 8.53707 0.000962485C8.75698 0.00982081 8.97048 0.0796305 9.15506 0.203025L13.4233 3.43792C13.5998 3.55133 13.7453 3.7091 13.8462 3.8964C13.9471 4.08369 14 4.29434 14 4.50851C14 4.72269 13.9471 4.93333 13.8462 5.12063C13.7453 5.30792 13.5998 5.4657 13.4233 5.57911L9.15506 8.814C8.97048 8.9374 8.75698 9.00721 8.53707 9.01607C8.31717 9.02492 8.09902 8.9725 7.90565 8.86433C7.71227 8.75616 7.55084 8.59626 7.43839 8.40148C7.32593 8.20671 7.26663 7.9843 7.26673 7.75771V7.02381Z" />
                                      </svg>
                                      Reply (02)
                                    </div>
                                  </div>
                                </div>
                                <ul className="comment-replay">
                                  <li>
                                    <div className="single-comment-area">
                                      <div className="author-img">
                                        <img src="/assets/img/inner-pages/comment-author-02.jpg" alt="" />
                                      </div>
                                      <div className="comment-content">
                                        <div className="author-name-deg">
                                          <h6>Jacoline Juie,</h6>
                                          <span>05 January, 2024</span>
                                        </div>
                                        <p>"What factors should I consider when choosing a car dealership for purchasing a vehicle"</p>
                                        <div className="replay-btn">
                                          <svg xmlns="http://www.w3.org/2000/svg" width={14} height={11} viewBox="0 0 14 11">
                                            <path d="M8.55126 1.11188C8.52766 1.10118 8.50182 1.09676 8.47612 1.09903C8.45042 1.1013 8.42569 1.11018 8.40419 1.12486C8.3827 1.13954 8.36513 1.15954 8.35311 1.18304C8.34109 1.20653 8.335 1.23276 8.33539 1.25932V2.52797C8.33539 2.67388 8.2791 2.81381 8.17889 2.91698C8.07868 3.02016 7.94277 3.07812 7.80106 3.07812C7.08826 3.07812 5.64984 3.08362 4.27447 3.98257C3.2229 4.66916 2.14783 5.9191 1.50129 8.24735C2.59132 7.16575 3.83632 6.57929 4.92635 6.2679C5.59636 6.07737 6.28492 5.96444 6.97926 5.93121C7.26347 5.91835 7.54815 5.92129 7.83205 5.94001H7.84594L7.85129 5.94111L7.80106 6.48906L7.85449 5.94111C7.98638 5.95476 8.10864 6.01839 8.19751 6.11966C8.28638 6.22092 8.33553 6.35258 8.33539 6.48906V7.75771C8.33539 7.87654 8.45294 7.95136 8.55126 7.90515L12.8088 4.67796C12.8233 4.66692 12.8383 4.65664 12.8537 4.64715C12.8769 4.63278 12.8962 4.61245 12.9095 4.58816C12.9229 4.56386 12.9299 4.53643 12.9299 4.50851C12.9299 4.4806 12.9229 4.45316 12.9095 4.42887C12.8962 4.40458 12.8769 4.38425 12.8537 4.36988C12.8382 4.36039 12.8233 4.35011 12.8088 4.33907L8.55126 1.11188ZM7.26673 7.02381C7.19406 7.02381 7.11391 7.02711 7.02842 7.03041C6.56462 7.05242 5.92342 7.12504 5.21169 7.32859C3.79464 7.7335 2.11684 8.65116 1.00115 10.7175C0.940817 10.8291 0.844683 10.9155 0.729224 10.9621C0.613765 11.0087 0.486168 11.0124 0.368304 10.9728C0.250441 10.9331 0.149648 10.8525 0.0831985 10.7447C0.0167484 10.6369 -0.011219 10.5086 0.0040884 10.3819C0.499949 6.29981 2.01959 4.15202 3.70167 3.05391C5.03215 2.18467 6.40218 2.01743 7.26673 1.98552V1.25932C7.26663 1.03273 7.32593 0.810317 7.43839 0.615545C7.55084 0.420773 7.71227 0.260866 7.90565 0.152696C8.09902 0.0445258 8.31717 -0.00789584 8.53707 0.000962485C8.75698 0.00982081 8.97048 0.0796305 9.15506 0.203025L13.4233 3.43792C13.5998 3.55133 13.7453 3.7091 13.8462 3.8964C13.9471 4.08369 14 4.29434 14 4.50851C14 4.72269 13.9471 4.93333 13.8462 5.12063C13.7453 5.30792 13.5998 5.4657 13.4233 5.57911L9.15506 8.814C8.97048 8.9374 8.75698 9.00721 8.53707 9.01607C8.31717 9.02492 8.09902 8.9725 7.90565 8.86433C7.71227 8.75616 7.55084 8.59626 7.43839 8.40148C7.32593 8.20671 7.26663 7.9843 7.26673 7.75771V7.02381Z" />
                                          </svg>
                                          Reply
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="single-comment-area">
                                      <div className="author-img">
                                        <img src="/assets/img/inner-pages/comment-author-03.jpg" alt="" />
                                      </div>
                                      <div className="comment-content">
                                        <div className="author-name-deg">
                                          <h6>Robert Smith,</h6>
                                          <span>05 January, 2024</span>
                                        </div>
                                        <p>"What factors should I consider when choosing a car dealership for purchasing a vehicle"</p>
                                        <div className="replay-btn">
                                          <svg xmlns="http://www.w3.org/2000/svg" width={14} height={11} viewBox="0 0 14 11">
                                            <path d="M8.55126 1.11188C8.52766 1.10118 8.50182 1.09676 8.47612 1.09903C8.45042 1.1013 8.42569 1.11018 8.40419 1.12486C8.3827 1.13954 8.36513 1.15954 8.35311 1.18304C8.34109 1.20653 8.335 1.23276 8.33539 1.25932V2.52797C8.33539 2.67388 8.2791 2.81381 8.17889 2.91698C8.07868 3.02016 7.94277 3.07812 7.80106 3.07812C7.08826 3.07812 5.64984 3.08362 4.27447 3.98257C3.2229 4.66916 2.14783 5.9191 1.50129 8.24735C2.59132 7.16575 3.83632 6.57929 4.92635 6.2679C5.59636 6.07737 6.28492 5.96444 6.97926 5.93121C7.26347 5.91835 7.54815 5.92129 7.83205 5.94001H7.84594L7.85129 5.94111L7.80106 6.48906L7.85449 5.94111C7.98638 5.95476 8.10864 6.01839 8.19751 6.11966C8.28638 6.22092 8.33553 6.35258 8.33539 6.48906V7.75771C8.33539 7.87654 8.45294 7.95136 8.55126 7.90515L12.8088 4.67796C12.8233 4.66692 12.8383 4.65664 12.8537 4.64715C12.8769 4.63278 12.8962 4.61245 12.9095 4.58816C12.9229 4.56386 12.9299 4.53643 12.9299 4.50851C12.9299 4.4806 12.9229 4.45316 12.9095 4.42887C12.8962 4.40458 12.8769 4.38425 12.8537 4.36988C12.8382 4.36039 12.8233 4.35011 12.8088 4.33907L8.55126 1.11188ZM7.26673 7.02381C7.19406 7.02381 7.11391 7.02711 7.02842 7.03041C6.56462 7.05242 5.92342 7.12504 5.21169 7.32859C3.79464 7.7335 2.11684 8.65116 1.00115 10.7175C0.940817 10.8291 0.844683 10.9155 0.729224 10.9621C0.613765 11.0087 0.486168 11.0124 0.368304 10.9728C0.250441 10.9331 0.149648 10.8525 0.0831985 10.7447C0.0167484 10.6369 -0.011219 10.5086 0.0040884 10.3819C0.499949 6.29981 2.01959 4.15202 3.70167 3.05391C5.03215 2.18467 6.40218 2.01743 7.26673 1.98552V1.25932C7.26663 1.03273 7.32593 0.810317 7.43839 0.615545C7.55084 0.420773 7.71227 0.260866 7.90565 0.152696C8.09902 0.0445258 8.31717 -0.00789584 8.53707 0.000962485C8.75698 0.00982081 8.97048 0.0796305 9.15506 0.203025L13.4233 3.43792C13.5998 3.55133 13.7453 3.7091 13.8462 3.8964C13.9471 4.08369 14 4.29434 14 4.50851C14 4.72269 13.9471 4.93333 13.8462 5.12063C13.7453 5.30792 13.5998 5.4657 13.4233 5.57911L9.15506 8.814C8.97048 8.9374 8.75698 9.00721 8.53707 9.01607C8.31717 9.02492 8.09902 8.9725 7.90565 8.86433C7.71227 8.75616 7.55084 8.59626 7.43839 8.40148C7.32593 8.20671 7.26663 7.9843 7.26673 7.75771V7.02381Z" />
                                          </svg>
                                          Reply
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <div className="single-comment-area">
                                  <div className="author-img">
                                    <img src="/assets/img/inner-pages/comment-author-04.jpg" alt="" />
                                  </div>
                                  <div className="comment-content">
                                    <div className="author-and-review">
                                      <div className="author-name-deg">
                                        <h6>Srileka Panday,</h6>
                                        <span>05 February, 2024</span>
                                      </div>
                                      <ul className="review d-flex flex-row align-items-center">
                                        <li><i className="bi bi-star-fill" /></li>
                                        <li><i className="bi bi-star-fill" /></li>
                                        <li><i className="bi bi-star-fill" /></li>
                                        <li><i className="bi bi-star-fill" /></li>
                                        <li><i className="bi bi-star" /></li>
                                      </ul>
                                    </div>
                                    <p>However, here are some well-regarded car dealerships known for their customer service, inventory, and overall reputation. It's always a good idea to research and read reviews specific...</p>
                                    <div className="replay-btn">
                                      <svg xmlns="http://www.w3.org/2000/svg" width={14} height={11} viewBox="0 0 14 11">
                                        <path d="M8.55126 1.11188C8.52766 1.10118 8.50182 1.09676 8.47612 1.09903C8.45042 1.1013 8.42569 1.11018 8.40419 1.12486C8.3827 1.13954 8.36513 1.15954 8.35311 1.18304C8.34109 1.20653 8.335 1.23276 8.33539 1.25932V2.52797C8.33539 2.67388 8.2791 2.81381 8.17889 2.91698C8.07868 3.02016 7.94277 3.07812 7.80106 3.07812C7.08826 3.07812 5.64984 3.08362 4.27447 3.98257C3.2229 4.66916 2.14783 5.9191 1.50129 8.24735C2.59132 7.16575 3.83632 6.57929 4.92635 6.2679C5.59636 6.07737 6.28492 5.96444 6.97926 5.93121C7.26347 5.91835 7.54815 5.92129 7.83205 5.94001H7.84594L7.85129 5.94111L7.80106 6.48906L7.85449 5.94111C7.98638 5.95476 8.10864 6.01839 8.19751 6.11966C8.28638 6.22092 8.33553 6.35258 8.33539 6.48906V7.75771C8.33539 7.87654 8.45294 7.95136 8.55126 7.90515L12.8088 4.67796C12.8233 4.66692 12.8383 4.65664 12.8537 4.64715C12.8769 4.63278 12.8962 4.61245 12.9095 4.58816C12.9229 4.56386 12.9299 4.53643 12.9299 4.50851C12.9299 4.4806 12.9229 4.45316 12.9095 4.42887C12.8962 4.40458 12.8769 4.38425 12.8537 4.36988C12.8382 4.36039 12.8233 4.35011 12.8088 4.33907L8.55126 1.11188ZM7.26673 7.02381C7.19406 7.02381 7.11391 7.02711 7.02842 7.03041C6.56462 7.05242 5.92342 7.12504 5.21169 7.32859C3.79464 7.7335 2.11684 8.65116 1.00115 10.7175C0.940817 10.8291 0.844683 10.9155 0.729224 10.9621C0.613765 11.0087 0.486168 11.0124 0.368304 10.9728C0.250441 10.9331 0.149648 10.8525 0.0831985 10.7447C0.0167484 10.6369 -0.011219 10.5086 0.0040884 10.3819C0.499949 6.29981 2.01959 4.15202 3.70167 3.05391C5.03215 2.18467 6.40218 2.01743 7.26673 1.98552V1.25932C7.26663 1.03273 7.32593 0.810317 7.43839 0.615545C7.55084 0.420773 7.71227 0.260866 7.90565 0.152696C8.09902 0.0445258 8.31717 -0.00789584 8.53707 0.000962485C8.75698 0.00982081 8.97048 0.0796305 9.15506 0.203025L13.4233 3.43792C13.5998 3.55133 13.7453 3.7091 13.8462 3.8964C13.9471 4.08369 14 4.29434 14 4.50851C14 4.72269 13.9471 4.93333 13.8462 5.12063C13.7453 5.30792 13.5998 5.4657 13.4233 5.57911L9.15506 8.814C8.97048 8.9374 8.75698 9.00721 8.53707 9.01607C8.31717 9.02492 8.09902 8.9725 7.90565 8.86433C7.71227 8.75616 7.55084 8.59626 7.43839 8.40148C7.32593 8.20671 7.26663 7.9843 7.26673 7.75771V7.02381Z" />
                                      </svg>
                                      Reply (02)
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className="single-comment-area">
                                  <div className="author-img">
                                    <img src="/assets/img/inner-pages/comment-author-05.jpg" alt="" />
                                  </div>
                                  <div className="comment-content">
                                    <div className="author-and-review">
                                      <div className="author-name-deg">
                                        <h6>Mr. Bowmik Haldar,</h6>
                                        <span>08 February, 2024</span>
                                      </div>
                                      <ul className="review d-flex flex-row align-items-center">
                                        <li><i className="bi bi-star-fill" /></li>
                                        <li><i className="bi bi-star-fill" /></li>
                                        <li><i className="bi bi-star-fill" /></li>
                                        <li><i className="bi bi-star-fill" /></li>
                                        <li><i className="bi bi-star-half" /></li>
                                      </ul>
                                    </div>
                                    <p>However, here are some well-regarded car dealerships known for their customer service, inventory, and overall reputation. It's always a good idea to research and read reviews specific...</p>
                                    <div className="replay-btn">
                                      <svg xmlns="http://www.w3.org/2000/svg" width={14} height={11} viewBox="0 0 14 11">
                                        <path d="M8.55126 1.11188C8.52766 1.10118 8.50182 1.09676 8.47612 1.09903C8.45042 1.1013 8.42569 1.11018 8.40419 1.12486C8.3827 1.13954 8.36513 1.15954 8.35311 1.18304C8.34109 1.20653 8.335 1.23276 8.33539 1.25932V2.52797C8.33539 2.67388 8.2791 2.81381 8.17889 2.91698C8.07868 3.02016 7.94277 3.07812 7.80106 3.07812C7.08826 3.07812 5.64984 3.08362 4.27447 3.98257C3.2229 4.66916 2.14783 5.9191 1.50129 8.24735C2.59132 7.16575 3.83632 6.57929 4.92635 6.2679C5.59636 6.07737 6.28492 5.96444 6.97926 5.93121C7.26347 5.91835 7.54815 5.92129 7.83205 5.94001H7.84594L7.85129 5.94111L7.80106 6.48906L7.85449 5.94111C7.98638 5.95476 8.10864 6.01839 8.19751 6.11966C8.28638 6.22092 8.33553 6.35258 8.33539 6.48906V7.75771C8.33539 7.87654 8.45294 7.95136 8.55126 7.90515L12.8088 4.67796C12.8233 4.66692 12.8383 4.65664 12.8537 4.64715C12.8769 4.63278 12.8962 4.61245 12.9095 4.58816C12.9229 4.56386 12.9299 4.53643 12.9299 4.50851C12.9299 4.4806 12.9229 4.45316 12.9095 4.42887C12.8962 4.40458 12.8769 4.38425 12.8537 4.36988C12.8382 4.36039 12.8233 4.35011 12.8088 4.33907L8.55126 1.11188ZM7.26673 7.02381C7.19406 7.02381 7.11391 7.02711 7.02842 7.03041C6.56462 7.05242 5.92342 7.12504 5.21169 7.32859C3.79464 7.7335 2.11684 8.65116 1.00115 10.7175C0.940817 10.8291 0.844683 10.9155 0.729224 10.9621C0.613765 11.0087 0.486168 11.0124 0.368304 10.9728C0.250441 10.9331 0.149648 10.8525 0.0831985 10.7447C0.0167484 10.6369 -0.011219 10.5086 0.0040884 10.3819C0.499949 6.29981 2.01959 4.15202 3.70167 3.05391C5.03215 2.18467 6.40218 2.01743 7.26673 1.98552V1.25932C7.26663 1.03273 7.32593 0.810317 7.43839 0.615545C7.55084 0.420773 7.71227 0.260866 7.90565 0.152696C8.09902 0.0445258 8.31717 -0.00789584 8.53707 0.000962485C8.75698 0.00982081 8.97048 0.0796305 9.15506 0.203025L13.4233 3.43792C13.5998 3.55133 13.7453 3.7091 13.8462 3.8964C13.9471 4.08369 14 4.29434 14 4.50851C14 4.72269 13.9471 4.93333 13.8462 5.12063C13.7453 5.30792 13.5998 5.4657 13.4233 5.57911L9.15506 8.814C8.97048 8.9374 8.75698 9.00721 8.53707 9.01607C8.31717 9.02492 8.09902 8.9725 7.90565 8.86433C7.71227 8.75616 7.55084 8.59626 7.43839 8.40148C7.32593 8.20671 7.26663 7.9843 7.26673 7.75771V7.02381Z" />
                                      </svg>
                                      Reply (02)
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-lg-5">
                          <div className="review-form">
                            <div className="number-of-review">
                              <h4>Write A Review</h4>
                            </div>
                            <form>
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="form-inner2 mb-40">
                                    <div className="review-rate-area">
                                      <p>Your Rating</p>
                                      <div className="rate">
                                        <input type="radio" id="star5" name="rate" defaultValue={5} />
                                        <label htmlFor="star5" title="text">5 stars</label>
                                        <input type="radio" id="star4" name="rate" defaultValue={4} />
                                        <label htmlFor="star4" title="text">4 stars</label>
                                        <input type="radio" id="star3" name="rate" defaultValue={3} />
                                        <label htmlFor="star3" title="text">3 stars</label>
                                        <input type="radio" id="star2" name="rate" defaultValue={2} />
                                        <label htmlFor="star2" title="text">2 stars</label>
                                        <input type="radio" id="star1" name="rate" defaultValue={1} />
                                        <label htmlFor="star1" title="text">1 star</label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="form-inner mb-20">
                                    <input type="text" placeholder="Name*" required />
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="form-inner mb-20">
                                    <input type="email" placeholder="Email*" required />
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="form-inner mb-30">
                                    <textarea placeholder="Message..." defaultValue={""} />
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <button type="submit" className="primary-btn2">
                                    <span>
                                      Submit Now
                                      <svg viewBox="0 0 13 20">
                                        <polyline points="0.5 19.5 3 19.5 12.5 10 3 0.5" />
                                      </svg>
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Home1FooterTop />

      <Footer1 />
    </div>
  )
}

export default ProductDetails