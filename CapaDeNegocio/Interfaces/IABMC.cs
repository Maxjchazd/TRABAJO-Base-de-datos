using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaDeNegocio
{
    internal interface IABMC : IID
    {
        void Modify();
        void Add();
        void Erase();
        string Find();
    }
}
