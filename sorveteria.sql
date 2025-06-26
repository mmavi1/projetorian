CREATE TABLE Produtos (
  id INT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  img VARCHAR(255)
);

CREATE TABLE Clientes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100),
  email VARCHAR(100),
  telefone VARCHAR(20)
);

CREATE TABLE Pedidos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  cliente_id INT,
  data_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10,2),
  FOREIGN KEY (cliente_id) REFERENCES Clientes(id)
);

CREATE TABLE ItensPedido (
  id INT PRIMARY KEY AUTO_INCREMENT,
  pedido_id INT,
  produto_id INT,
  quantidade INT NOT NULL,
  preco_unitario DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (pedido_id) REFERENCES Pedidos(id),
  FOREIGN KEY (produto_id) REFERENCES Produtos(id)
);
