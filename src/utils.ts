export const formatDate = function (dateString: string) {
 const date = new Date(dateString);
 const utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
 return utcDate.toLocaleDateString('pt-BR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
 });
}