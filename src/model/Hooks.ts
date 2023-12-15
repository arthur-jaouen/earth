import {
  Author,
  AuthorItem,
  BlobUrl,
  Category,
  CategoryChild,
  Dim,
  Err,
  Init,
  Legend,
  Loading,
  Media,
  Picture,
  Source,
  SourceItem,
  Tag,
  Timeline,
  TimelineState,
  Url,
} from './Components'
import { STORE } from './Store'

export const useAuthor = STORE.pool(Author).useComponent
export const useAuthorEntities = STORE.pool(Author).useEntities
export const useAuthorItems = STORE.pool(AuthorItem).useEntries

export const useBlobUrl = STORE.pool(BlobUrl).useComponent

export const useCategories = STORE.pool(Category).useEntries
export const useCategoryChild = STORE.pool(CategoryChild).useComponent
export const useCategoryChildren = STORE.pool(CategoryChild).useEntries

export const useDim = STORE.pool(Dim).useComponent

export const useErr = STORE.pool(Err).useComponent

export const useInit = STORE.pool(Init).useComponent

export const useLegend = STORE.pool(Legend).useComponent

export const useLoading = STORE.pool(Loading).useComponent

export const useMedia = STORE.pool(Media).useComponent
export const useMediaEntities = STORE.pool(Media).useEntities

export const usePicture = STORE.pool(Picture).useComponent

export const useSource = STORE.pool(Source).useComponent
export const useSourceItem = STORE.pool(SourceItem).useComponent

export const useSuccess = STORE.pool(Loading).useComponent

export const useTag = STORE.pool(Tag).useComponent
export const useTags = STORE.pool(Tag).useEntries

export const useTimeline = STORE.pool(Timeline).useComponent
export const useTimelineState = STORE.pool(TimelineState).useComponent

export const useUrl = STORE.pool(Url).useComponent
