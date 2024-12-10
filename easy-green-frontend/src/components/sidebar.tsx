import { Avatar, Drawer, List, ListItem, Button } from "@mui/material";
import Logo from "../assets/images/Easy-Green.png";
import { useLocation } from "react-router-dom";
import { memo } from "react";

const Sidebar = memo(() => {
  const location = useLocation();
  return (
    <Drawer
      variant="permanent"
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: "#003300",
          color: "white",
          width: "15%",
        },
      }}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-center py-6">
            <img src={Logo} alt="Logo" className="h-32" />
          </div>
          <List>
            {[
              { label: "Home", href: "/admin" },
              { label: "Clients", href: "/admin/clients" },
              { label: "Calendar", href: "/admin/calendar" },
            ].map((item) => (
              <ListItem key={item.href} sx={{ px: 2, py: 1 }}>
                                <Button
                  variant="text"
                  fullWidth
                  sx={{
                    justifyContent: "flex-start",
                    paddingLeft: "50px",
                    textTransform: "none",
                    fontSize: "20px",
                    color: "white",
                    borderRadius:'15px',
                    borderWidth: "0.3px",
                    borderStyle: "solid", 
                    borderColor:
                      location.pathname === item.href ? "white" : "transparent", 
                    "&:hover": {
                      backgroundColor: "#4F724F",
                      color: "white",
                    },
                  }}
                  href={item.href}
                >
                  {item.label}
                </Button>
              </ListItem>
            ))}
          </List>
        </div>

        <div className="flex items-center gap-4 p-4">
          <Avatar />
          <div>
            <h4 className="font-bold text-[20px]">Helen Appitie</h4>
            <p className="text-sm text-gray-400 text-[18px]">
              Loan Administrator
            </p>
          </div>
        </div>
      </div>
    </Drawer>
  );
});

export default Sidebar;


