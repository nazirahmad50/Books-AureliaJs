export class BookStatusValueConverter {
  toView(value) {
    switch (value) {
      case "bad":
        return "fa-frown-o";
      case "good":
        return "fa-smaile-o";
      case "ok":
        return "fa-meh-o";
    }
  }
}
