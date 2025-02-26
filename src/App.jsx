import { useState, useEffect } from "react";
import { openDB } from "idb";
import MiranteSVG from '/mirante1024.png';
import DataTable from "react-data-table-component";

const defaultItems = [
  { id: 1, name: 'Chope Pilsen', type: 'Bar', checked: true },
  { id: 2, name: 'Chope IPA', type: 'Bar', checked: true },
  { id: 3, name: 'Original 600', type: 'Bar', checked: true },
  { id: 4, name: 'Heineken 600', type: 'Bar', checked: true },
  { id: 5, name: 'Long Neck Zero', type: 'Bar', checked: true },
  { id: 6, name: 'Coca-Cola', type: 'Bar', checked: true },
  { id: 7, name: 'Coca-Cola Zero', type: 'Bar', checked: true },
  { id: 8, name: 'Guaraná', type: 'Bar', checked: true },
  { id: 9, name: 'Guaraná Zero', type: 'Bar', checked: true },
  { id: 10, name: 'Suco de Laranja', type: 'Bar', checked: true },
  { id: 11, name: 'Suco de Uva', type: 'Bar', checked: true },
  { id: 12, name: 'Água', type: 'Bar', checked: true },
  { id: 13, name: 'Água Gaseificada', type: 'Bar', checked: true },
  { id: 14, name: 'Vinho', type: 'Bar', checked: true },
  { id: 15, name: 'Vinho Branco', type: 'Bar', checked: true },
  { id: 16, name: 'Vinho Branco Rosé', type: 'Bar', checked: true },
  { id: 17, name: 'Espumante Brut', type: 'Bar', checked: true },
  { id: 18, name: 'Espumante Moscatel', type: 'Bar', checked: true },
  { id: 19, name: 'Espumante Demi-Sec', type: 'Bar', checked: true },
  
  { id: 20, name: 'Queijo Mussarela', type: 'Cozinha', checked: true },
  { id: 21, name: 'Queijo Gorgonzola', type: 'Cozinha', checked: true },
  { id: 22, name: 'Queijo Provolone', type: 'Cozinha', checked: true },
  { id: 23, name: 'Queijo Vegano', type: 'Cozinha', checked: true },
  { id: 24, name: 'Creme de Queijo Vegano', type: 'Cozinha', checked: true },
  { id: 25, name: 'Massa de Pizza', type: 'Cozinha', checked: true },
  { id: 26, name: 'Filé Mignon', type: 'Cozinha', checked: true },
  { id: 27, name: 'Calabresa Defumada', type: 'Cozinha', checked: true },
  { id: 28, name: 'Peito de Frango', type: 'Cozinha', checked: true },
  { id: 29, name: 'Carne de Panela', type: 'Cozinha', checked: true },
  { id: 30, name: 'Cebola Caramelizada', type: 'Cozinha', checked: true },
  { id: 31, name: 'Alface', type: 'Cozinha', checked: true },
  { id: 32, name: 'Tomate', type: 'Cozinha', checked: true },
  { id: 33, name: 'Picles', type: 'Cozinha', checked: true },
  { id: 34, name: 'Azeitona', type: 'Cozinha', checked: true },
  { id: 35, name: 'Cebola', type: 'Cozinha', checked: true },
  { id: 36, name: 'Ovo de Codorna', type: 'Cozinha', checked: true },
  { id: 37, name: 'Pão Cervejinha', type: 'Cozinha', checked: true },
  { id: 38, name: 'Batata', type: 'Cozinha', checked: true },
  { id: 39, name: 'Azeite', type: 'Cozinha', checked: true },
  { id: 40, name: 'Shoyu', type: 'Cozinha', checked: true },
  { id: 41, name: 'Molho de Tomate', type: 'Cozinha', checked: true },
  { id: 42, name: 'Molho de Pimenta', type: 'Cozinha', checked: true },
  { id: 43, name: 'Maionese', type: 'Cozinha', checked: true },
  { id: 44, name: 'Orégano', type: 'Cozinha', checked: true },
  { id: 45, name: 'Pápricas', type: 'Cozinha', checked: true },
  { id: 46, name: 'Curry', type: 'Cozinha', checked: true },
  { id: 47, name: 'Conhaque de Gengibre', type: 'Cozinha', checked: true },
  { id: 48, name: 'Açúcar', type: 'Cozinha', checked: true },
  { id: 49, name: 'Sal', type: 'Cozinha', checked: true },
  
  { id: 50, name: 'Sachê de Ketchup', type: 'Armazém', checked: true },
  { id: 51, name: 'Sachê de Mostarda', type: 'Armazém', checked: true },
  { id: 52, name: 'Sachê de Maionese', type: 'Armazém', checked: true },
  { id: 53, name: 'Palito de Dente', type: 'Armazém', checked: true },
  { id: 54, name: 'Palito para Ninho', type: 'Armazém', checked: true },
  { id: 55, name: 'Embalagem para Pizza', type: 'Armazém', checked: true },
  { id: 56, name: 'Embalagem para Bauru', type: 'Armazém', checked: true },
  { id: 57, name: 'Guardanapo', type: 'Armazém', checked: true },
  { id: 58, name: 'Papel Toalha', type: 'Armazém', checked: true },
  { id: 59, name: 'Papel Manteiga', type: 'Armazém', checked: true },
  { id: 60, name: 'Papel Higiênico', type: 'Armazém', checked: true },
  { id: 61, name: 'Limão', type: 'Armazém', checked: true },
  { id: 62, name: 'Morango', type: 'Armazém', checked: true },
  { id: 63, name: 'Gelo', type: 'Armazém', checked: true },
  { id: 64, name: 'Vodka', type: 'Armazém', checked: true },
  { id: 65, name: 'Cachaça', type: 'Armazém', checked: true }
];

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [newType, setNewType] = useState("Bar");

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installable, setInstallable] = useState(false);

  useEffect(() => {
    const initDB = async () => {
      const db = await openDB("shoppingDB", 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains("items")) {
            db.createObjectStore("items", { keyPath: "id", autoIncrement: true });
          }
        },
      });
      const tx = db.transaction("items", "readonly");
      const store = tx.objectStore("items");
      const allItems = await store.getAll();
      setItems(allItems);
    };
    initDB();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  // Função para instalar o PWA manualmente
  const installPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstallable(false);
      }
      setDeferredPrompt(null);
    }
  };

  const addItem = async () => {
    if (newItem.trim() !== "") {
      const db = await openDB("shoppingDB", 1);
      const tx = db.transaction("items", "readwrite");
      const store = tx.objectStore("items");
      const id = await store.add({ name: newItem, type: newType, checked: true });
      setItems([...items, { id, name: newItem, type: newType, checked: true }]);
      setNewItem("");
    }
  };

  const toggleCheck = async (id) => {
    const db = await openDB("shoppingDB", 1);
    const tx = db.transaction("items", "readwrite");
    const store = tx.objectStore("items");
    const item = await store.get(id);
    item.checked = !item.checked;
    await store.put(item);
    setItems(items.map(i => (i.id === id ? item : i)));
  };

  const toggleAll = async (checked) => {
    const db = await openDB("shoppingDB", 1);
    const tx = db.transaction("items", "readwrite");
    const store = tx.objectStore("items");
    const allItems = await store.getAll();
    for (let item of allItems) {
      item.checked = checked;
      await store.put(item);
    }
    setItems(allItems.map(item => ({ ...item, checked })));
  };

  const sendToWhatsApp = () => {
    const missingItems = items.filter(item => !item.checked);
  
    if (missingItems.length === 0) {
      alert("Todos os itens estão disponíveis!");
      return;
    }
  
    // Agrupar itens por tipo
    const groupedItems = missingItems.reduce((acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      acc[item.type].push(item.name);
      return acc;
    }, {});
  
    // Criar a mensagem formatada
    let message = "🛒 *Itens em falta:*\n\n";
    for (const [type, products] of Object.entries(groupedItems)) {
      message += `*${type}:*\n`;
      message += products.map(product => `- ${product}`).join("\n");
      message += "\n\n";
    }
  
    // Criar URL do WhatsApp e enviar
    const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

  const resetItems = async () => {
    const db = await openDB("shoppingDB", 1);
    const tx = db.transaction("items", "readwrite");
    const store = tx.objectStore("items");
  
    // Limpa todos os itens do banco de dados
    await store.clear();
    await tx.done;
  
    // Define os itens padrão no banco novamente
    const txAdd = db.transaction("items", "readwrite");
    const storeAdd = txAdd.objectStore("items");
  
    for (let item of defaultItems) {
      await storeAdd.add(item);
    }
    await txAdd.done;
  
    // Atualiza o estado com os novos itens padrão
    setItems(defaultItems);
  };

  const columns = [
    { name: "Produto", selector: row => row.name, sortable: true, minWidth: "200px", grow: 2 },
    { name: "Tipo", selector: row => row.type, sortable: true, minWidth: "100px", maxWidth: "120px" },
    { 
      name: "Disponível", 
      cell: row => (
        <input 
          type="checkbox" 
          checked={row.checked} 
          onChange={() => toggleCheck(row.id)} 
          className="w-5 h-5"
        />
      ),
      minWidth: "70px", 
      maxWidth: "80px",
      center: true
    }
  ];  

  const paginationOptions = {
    rowsPerPageText: 'Linhas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };

  const customStyles = {
    table: {
      style: {
        width: "100%",
        borderRadius: "15px",
        overflow: "hidden",
      },
    },
    rows: {
      style: {
        minHeight: "48px",
      },
    },
    headCells: {
      style: {
        backgroundColor: "#f8f9fa",
        color: "#333",
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
    pagination: {
      style: {
        borderRadius: "15px",
        overflow: "hidden",
      },
    },
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden w-screen">
      <div className="w-full max-w-full shadow-lg rounded-lg">
        <div className="mb-3">
          <div className="flex flex-col items-center mb-4 mt-4 text-center">
            <img src={MiranteSVG} alt="Mirante-Logo" className="w-35 h-auto mb-2" />
            <h1 className="text-lg font-bold text-gray-200">Lista de Compras</h1>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-8 p-3 w-full">
            <input
              type="text"
              placeholder="Nome do Produto"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              className="p-2 border rounded w-full"
            />
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              className="p-2 border rounded text-lg bg-white text-black w-full md:w-auto"
            >
              <option value="Bar">Bar</option>
              <option value="Cozinha">Cozinha</option>
              <option value="Armazém">Armazém</option>
            </select>
            <button
              onClick={addItem}
              className="p-2 bg-blue-500 text-white rounded w-full md:w-auto"
            >
              Adicionar
            </button>
          </div>
        </div>
        <div className="w-full overflow-hidden">
          <DataTable
            customStyles={customStyles}
            className="mb-1 w-full"
            columns={columns}
            data={items}
            pagination
            paginationComponentOptions={paginationOptions}
          />
        </div>
        <div className="flex flex-col justify-center gap-4 mt-8 p-3 w-full">
          <button
            onClick={() => toggleAll(true)}
            className="p-2 bg-gray-700 text-white rounded w-full"
          >
            Marcar Todos
          </button>
          <button
            onClick={() => toggleAll(false)}
            className="p-2 bg-gray-700 text-white rounded w-full"
          >
            Desmarcar Todos
          </button>
          <button
            onClick={sendToWhatsApp}
            style={{ backgroundColor: "#25D366" }}
            className="p-2 text-white rounded w-full"
          >
            Enviar por WhatsApp
          </button>

          {installable && (
            <button onClick={installPWA} style={{ padding: 10, backgroundColor: "blue", color: "white" }}>
              Instalar App
            </button>
          )}

          <button
            onClick={resetItems}
            className="mt-20 p-2 bg-red-500 text-white rounded w-full"
          >
            Resetar Banco de Dados
          </button>
        </div>
      </div>
    </div>
  );
  
}

export default App
