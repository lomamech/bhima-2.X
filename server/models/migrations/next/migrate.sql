/*
 * next version
 */
CALL add_column_if_missing('purchase', 'info_purchase_number', 'VARCHAR(50) NULL');
CALL add_column_if_missing('purchase', 'info_prf_number', 'VARCHAR(50) NULL');
CALL add_column_if_missing('purchase', 'info_contact_name', 'VARCHAR(50) NULL');
CALL add_column_if_missing('purchase', 'info_contact_phone', 'VARCHAR(20) NULL');
CALL add_column_if_missing('purchase', 'info_contact_title', 'VARCHAR(50) NULL');
CALL add_column_if_missing('purchase', 'info_delivery_location', 'VARCHAR(100) NULL');
CALL add_column_if_missing('purchase', 'info_delivery_date', 'VARCHAR(50) NULL');
CALL add_column_if_missing('purchase', 'info_delivery_condition', 'TEXT NULL');
CALL add_column_if_missing('purchase', 'info_special_instruction', 'TEXT NULL');
CALL add_column_if_missing('purchase', 'info_payment_condition', 'TEXT NULL');

CALL add_column_if_missing('entity', 'title', 'VARCHAR(150) NULL');

CALL add_column_if_missing('supplier', 'contact_uuid', 'BINARY(16) NULL');

CALL add_column_if_missing('enterprise_setting', 'enable_prf_details', 'TINYINT(1) NOT NULL DEFAULT 0');
CALL add_column_if_missing('enterprise_setting', 'purchase_general_condition', 'TEXT NULL');

/*
 * @author: lomamech
 * @date: 2022-09-07
 * @description: Problem with drug packaging
*/
CALL add_column_if_missing('stock_setting', 'enable_packaging_pharmaceutical_products', 'TINYINT(1) NOT NULL DEFAULT 0');
CALL add_column_if_missing('inventory', 'is_count_per_container', 'TINYINT(1) NOT NULL DEFAULT 0');
CALL add_column_if_missing('depot', 'is_count_per_container', 'TINYINT(1) NOT NULL DEFAULT 0');
CALL add_column_if_missing('lot', 'package_size', 'INT(11) DEFAULT 1');
