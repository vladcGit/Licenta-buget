import {
  DashboardOutlined,
  LoginOutlined,
  ProfileOutlined,
  PlusOutlined,
  UnorderedListOutlined,
  DollarOutlined,
  LineChartOutlined,
} from "@ant-design/icons";

const icons = {
  DashboardOutlined,
  LoginOutlined,
  ProfileOutlined,
  PlusOutlined,
  UnorderedListOutlined,
  DollarOutlined,
  LineChartOutlined,
};

const dashboard = {
  id: "group-dashboard",
  title: "Navigation",
  type: "group",
  children: [
    {
      id: "dashboard",
      title: "Dashboard",
      type: "item",
      url: "/",
      icon: icons.DashboardOutlined,
      breadcrumbs: false,
    },
  ],
};

const authentication = {
  id: "authentication",
  title: "Authentication",
  type: "group",
  children: [
    {
      id: "login1",
      title: "Login",
      type: "item",
      url: "/login",
      icon: icons.LoginOutlined,
      target: true,
    },
    {
      id: "register1",
      title: "Register",
      type: "item",
      url: "/signup",
      icon: icons.ProfileOutlined,
      target: true,
    },
  ],
};

const transactions = {
  id: "Transactions",
  title: "Transactions",
  type: "group",
  children: [
    {
      id: "addTransaction",
      title: "Add new transaction",
      type: "item",
      url: "/new-transaction",
      icon: icons.PlusOutlined,
      target: true,
    },
    {
      id: "allTransactions",
      title: "View all transactions",
      type: "item",
      url: "/transactions",
      icon: icons.UnorderedListOutlined,
      target: true,
    },
  ],
};

const goals = {
  id: "Goals",
  title: "Goals",
  type: "group",
  children: [
    {
      id: "manageGoal",
      title: "Manage Goals",
      type: "item",
      url: "/goals",
      icon: icons.DollarOutlined,
      target: true,
    },
  ],
};

const investments = {
  id: "Investments",
  title: "Investments",
  type: "group",
  children: [
    {
      id: "manageInvestments",
      title: "Check your investments",
      type: "item",
      url: "/investments",
      icon: icons.LineChartOutlined,
      target: true,
    },
  ],
};

const menuItems = {
  items: [dashboard, authentication, transactions, goals, investments],
};

export default menuItems;
