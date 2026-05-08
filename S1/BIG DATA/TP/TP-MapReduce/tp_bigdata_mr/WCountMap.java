/*
  Exemple de programme Hadoop - compteur d'occurences de mots.
  --
  WCountMap.java: classe MAP.
*/
package wordcount;

import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.io.IntWritable;
import java.util.StringTokenizer;
import org.apache.hadoop.mapreduce.Mapper;
import java.io.IOException;


// Notre classe MAP.
public class WCountMap extends Mapper<Object, Text, Text, IntWritable>
{
	private static final IntWritable ONE=new IntWritable(1);

	// La fonction MAP elle-même.
	protected void map(Object key, Text value, Context context) throws IOException, InterruptedException
	{  
		// Un StringTokenizer va nous permettre de parcourir chacun des mots de la ligne qui est passée
		// à notre opération MAP.
		StringTokenizer tok=new StringTokenizer(value.toString(), " ");
		while(tok.hasMoreTokens())
		{
			Text word=new Text(tok.nextToken());
			// On renvoie notre couple (clef;valeur): le mot courant suivi de la valeur 1 (définie dans la constante ONE).
			context.write(word, ONE);
		}
	}
}
