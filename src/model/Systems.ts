import {
  Author,
  AuthorItem,
  Bounds,
  Category,
  CategoryChild,
  Coords,
  Dim,
  Item,
  Legend,
  LocationItem,
  Picture,
  Source,
  SourceItem,
  Tag,
  Timeline,
  TimelinePicture,
  Url,
} from './Components'
import { STORE } from './Store'

export const AuthorSystem = STORE.system(Item, Author, Url)

export const CategorySystem = STORE.system(Item, Category, Tag)

export const LocationSystem = STORE.system(Item, Coords, Bounds)

export const PictureSystem = STORE.system(
  Item,
  Picture,
  Legend,
  Dim,
  CategoryChild,
  SourceItem,
  LocationItem,
  Tag,
)

export const SourceSystem = STORE.system(Item, Source, Url, AuthorItem)

export const TimelineSystem = STORE.system(
  Item,
  Timeline,
  Legend,
  Dim,
  CategoryChild,
  SourceItem,
  LocationItem,
  Tag,
)

export const TimelinePictureSystem = STORE.system(TimelinePicture, Picture, Tag)
