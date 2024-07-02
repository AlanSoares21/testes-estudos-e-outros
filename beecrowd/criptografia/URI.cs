using System;
using System.Text;

namespace criptografia;

public class URI {

    public static void Main(string[] args) { 
        int amountLines = int.Parse(Console.ReadLine());
        for(int currentLine = 0; 
            currentLine < amountLines; 
            currentLine++) 
        {
            byte[] line = Encoding.ASCII.GetBytes(Console.ReadLine());
            for (int i = 0; i < line.Length; i++) {
                if (
                    (byte)'a' <= line[i] 
                    &&
                    (byte)'z' >= line[i] 
                    ||
                    (byte)'A' <= line[i] 
                    &&
                    (byte)'Z' >= line[i] 
                )
                    line[i] += 3;
            }
            for (int i = 0; i < line.Length/2 + (line.Length%2); i++) {
                int j = line.Length - 1 - i;
                byte aux = line[i];
                line[i] = line[j];
                line[j] = aux;
                line[j] -= 1;
            }
            Console.WriteLine(Encoding.ASCII.GetString(line));
        }
    }

}