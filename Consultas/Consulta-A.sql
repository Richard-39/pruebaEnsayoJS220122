-- Se requiere un listado de productos con sus precios, de aquellos productos cuyo modelo es 2016, 
-- ordenado alfabéticamente por nombre. El reporte debe tener la siguiente forma:

select product_id, products.product_name, model_year ,products.list_price from products where model_year = '2016' order by product_name asc;