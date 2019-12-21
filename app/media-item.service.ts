import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { _throw } from "rxjs/observable/throw";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class MediaItemService {
  constructor(private http: HttpClient) {}

  get(medium) {
    const getOptions = {
      params: { medium }
    };
    return this.http.get<MediaItemResponse>("mediaitems", getOptions).pipe(
      map(response => {
        return response.mediaItems;
      }),
      catchError(this.handleError)
    );
  }

  add(mediaItem) {
    return this.http
      .post("mediaitems", mediaItem)
      .pipe(catchError(this.handleError));
  }

  delete(mediaItem) {
    return this.http
      .delete(`mediaitems/${mediaItem.id}`)
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    console.log(error.message);
    return _throw("A data error occured, please try again.");
  }
}

interface MediaItem {
  id: number;
  name: string;
  medium: string;
  category: string;
  year: number;
  watchedOn: number;
  isFavorite: boolean;
}
interface MediaItemResponse {
  mediaItems: MediaItem[];
}
