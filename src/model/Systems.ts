import {
  Author,
  AuthorItem,
  Bounds,
  Category,
  CategoryChild,
  Coords,
  Dim,
  Legend,
  LocationItem,
  Media,
  Picture,
  Source,
  SourceItem,
  Tag,
  Timeline,
  TimelinePicture,
  Url,
} from './Components'
import { STORE } from './Store'

export const AuthorSystem = STORE.system(Media, Author, Url)

export const CategorySystem = STORE.system(Media, Category)

export const LocationSystem = STORE.system(Media, Coords, Bounds)

export const PictureSystem = STORE.system(
  Media,
  Picture,
  Legend,
  Dim,
  CategoryChild,
  SourceItem,
  LocationItem,
  Tag,
)

export const SourceSystem = STORE.system(Media, Source, Url, AuthorItem)

export const TimelineSystem = STORE.system(
  Media,
  Timeline,
  Legend,
  Dim,
  CategoryChild,
  SourceItem,
  LocationItem,
  Tag,
)

export const TimelinePictureSystem = STORE.system(TimelinePicture, Picture, Tag)
