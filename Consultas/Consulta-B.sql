-- Se requiere un inventario de productos para mujeres (aquellos que dice Ladies en el nombre) 
-- ordenado por precio descendente. El reporte debe tener la siguiente forma:

select product_id, products.product_name, model_year ,products.list_price from products where product_name like '%Ladies%' order by list_price desc;