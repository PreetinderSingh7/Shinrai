export const loadPage = (absoluteHtmlFilePath) => {
    if (!absoluteHtmlFilePath)
        return;
    window.location.href = absoluteHtmlFilePath;
}