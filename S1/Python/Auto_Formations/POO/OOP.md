### **OOP**



* ##### **Encapsulation**

1.  	Adding functions of **getter** and **setter and change variables from public to private**

* ##### **Abstraction**

1.  	Abstraction : Means hiding unnecessary details and focusing on essential functionalities of an object.

* ##### **Inheritance(Heritage)**

1. **Child/Drive class** : the class that inherits
2. **Parent/Base/Supper class** : the class that inherited

* ##### **Polymorphism**

1. **Method Overriding** (redefinition of methods in child class)
2. **Method Overloading** (create many methods by the same name but not by the same parameters))

---

* ##### **Methods**

1. **Class methods** can edit class variable but cannot edit instance variable (**@classmethod**).
2. **Instance methods** can edit both class variables AND instance variables **(@abstractmethod).**
3. **Static methods** Cannot edit class variables and cannot edit instance variables can only work with parameters passed to them (**@staticmethod**).

---

* ##### **DIR**

1. "dir(class name)" : diR role is to list all attributes and methods of an object (**dunder functions**)

* ##### **Dunder functions**

1. **\_\_init\_\_(self, ...) : The constructor for a class.**
2. **\_\_str\_\_(self) : Defines a human-readable string representation of an object (return str). str(obj), print(obj)**
3. \_\_len\_\_(self) : Defines the length of an object (return int). len(obj)
4. \_\_call\_\_(self, \*args, \*\*kwargs) : Allows an instance of a class to be called like a function. obj()
5. \_\_repr\_\_(self) : Defines an unambiguous string representation of an object, primarily for developers and debugging.	repr(obj)
6. \_\_bool\_\_(self) : Defines how an object is evaluated in a boolean context (e.g., in an if statement).
7. \_\_add\_\_(self, other) : Implements the addition operation. obj + other
8. **\_\_iadd\_\_(self, other) : Implements the in-place addition operator.** obj += value
9. **\_\_radd\_\_(self, other) : Implements reflected (reversed) addition.** value **+ obj**
10. **\_\_getitem\_\_(self, key) : Implements behavior for indexing. obj\[key]**
11. **\_\_setitem\_\_(self, key, value) : Defines the behavior for assignment to an index or key. obj\[key] = value**
12. **\_\_eq\_\_(self, other) : Defines the behavior for the equality operator. obj == other**
13. **\_\_iter\_\_(self) : Returns an iterator for the object, allowing it to be used in loops. for item in obj:**





**DATA CLASS**

