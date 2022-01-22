-- Se requiere un reporte con la cantidad de productos de cada categoría, ordenado de mayor a 
-- menor cantidad. El reporte debe tener la siguiente forma:

select categories.category_id, categories.category_name, count(products.product_id) p from categories join products on categories.category_id = products.category_id group by categories.category_id order by p desc;