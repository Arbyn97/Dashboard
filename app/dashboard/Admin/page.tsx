
import MangeGoods from "./ManageGoods";
import MangeUsers from "./ManageUser";
export default function Adminpage() {
    return (  
        <div className="AdminNavbar">
            Admin page
          
          <MangeUsers/>
          
            <MangeGoods/>
          
        </div>
    );
}

