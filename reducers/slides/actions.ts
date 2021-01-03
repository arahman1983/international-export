import {AdminSlide} from '../../types/slider'

export const addSlide = (slide:AdminSlide) => ({
  type: "ADD_SLIDE",
  slide,
});

export const editSlide = (id:number, slide:AdminSlide) => ({
  type: "EDIT_SLIDE",
  id,
  slide,
});

export const setSlides = (slides:AdminSlide) => ({
  type: "SET_SLIDES",
  slides,
});