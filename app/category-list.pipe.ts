import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "categoryList"
})
export class CategoryListPipe implements PipeTransform {
  transform(mediaItems) {
    const categories = [];
    mediaItems.forEach(mediaItem => {
      if (categories.indexOf(mediaItem.categorie) <= -1) {
        categories.push(mediaItem.category);
      }
    });
    return categories.join(", ");
  }
}
